from __future__ import annotations

import asyncio
import json
from typing import Literal
from uuid import uuid4

from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel, EmailStr, Field

from app.chat import generate_reply
from app.config import settings
from app.storage import init_db, insert_chat_event, insert_lead_capture


app = FastAPI(title="aiButler.me API", version="0.1.0")

cors_origins = [origin.strip() for origin in settings.CORS_ALLOWED_ORIGINS.split(",") if origin.strip()]
app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class MarketingTurn(BaseModel):
    role: Literal["assistant", "user"]
    text: str = Field(default="", max_length=2000)


class MarketingChatRequest(BaseModel):
    segment: str = Field(min_length=1, max_length=40)
    sourcePath: str = Field(default="/", max_length=160)
    sessionId: str | None = Field(default=None, max_length=120)
    message: str = Field(min_length=1, max_length=2000)
    history: list[MarketingTurn] = Field(default_factory=list)


class MarketingLeadCaptureRequest(BaseModel):
    email: EmailStr
    segment: str = Field(min_length=1, max_length=40)
    audienceLabel: str = Field(default="", max_length=120)
    offer: str = Field(default="", max_length=600)
    sourcePath: str = Field(default="/", max_length=160)
    note: str | None = Field(default=None, max_length=1200)
    conversation: list[MarketingTurn] = Field(default_factory=list)


def _sse_frame(*, data: dict, event: str | None = None) -> str:
    lines: list[str] = []
    if event:
        lines.append(f"event: {event}")
    payload = json.dumps(data, separators=(",", ":"), ensure_ascii=False)
    for line in payload.splitlines() or ["{}"]:
        lines.append(f"data: {line}")
    return "\n".join(lines) + "\n\n"


@app.on_event("startup")
def on_startup():
    init_db()


@app.get("/health")
def health():
    return {"ok": True, "environment": settings.APP_ENV}


@app.post("/marketing/chat")
async def marketing_chat(payload: MarketingChatRequest, request: Request):
    message = (payload.message or "").strip()
    if not message:
        raise HTTPException(status_code=400, detail="Message is required")

    session_id = (payload.sessionId or "").strip() or f"mira-{uuid4().hex[:16]}"
    history = [{"role": turn.role, "text": turn.text} for turn in payload.history]
    reply = generate_reply(segment=payload.segment, message=message, history=history)

    insert_chat_event(
        session_id=session_id,
        segment=payload.segment,
        source_path=payload.sourcePath,
        user_message=message,
        assistant_reply=reply,
    )

    async def generator():
        built = ""
        yield "retry: 2500\n\n"
        for token in reply.split():
            if await request.is_disconnected():
                break
            built = f"{built} {token}".strip()
            yield _sse_frame(event="token", data={"text": built, "done": False})
            await asyncio.sleep(0.03)
        yield _sse_frame(event="done", data={"text": reply, "done": True, "session_id": session_id})

    return StreamingResponse(
        generator(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no",
        },
    )


@app.post("/marketing/leads/capture")
def marketing_lead_capture(payload: MarketingLeadCaptureRequest, request: Request):
    insert_lead_capture(
        email=payload.email.strip().lower(),
        segment=payload.segment,
        audience_label=payload.audienceLabel,
        offer=payload.offer,
        source_path=payload.sourcePath,
        note=payload.note or "",
        conversation=[turn.model_dump() for turn in payload.conversation[:12]],
        source_ip=request.client.host if request.client else None,
    )
    return {"ok": True, "email": payload.email.strip().lower()}

