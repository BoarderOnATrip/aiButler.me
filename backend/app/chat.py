from __future__ import annotations

import logging
import re

import requests

from app.config import settings


logger = logging.getLogger(__name__)


SEGMENT_GUIDANCE = {
    "random": "Convert curiosity into felt relief quickly. Be warm, vivid, and make the next step obvious.",
    "investors": "Sound like a serious product operator. Keep Butler as the business and Origami Encryption as the research edge.",
    "users": "Stay concrete. Focus on message triage, calendar shaping, receipts, and trustworthy delegation.",
    "returning": "Skip the beginner pitch. Emphasize continuity, upgrades, and the next leverage point.",
    "new": "Use plain language, orient the visitor gently, and route them into the right next room.",
}


def _clean_text(value: str | None, limit: int = 1200) -> str:
    return re.sub(r"\s+", " ", (value or "")).strip()[:limit]


def fallback_reply(segment: str, message: str) -> str:
    lower = _clean_text(message, limit=400).lower()

    if segment == "investors":
        if "moat" in lower or "defensible" in lower:
            return (
                "The moat is relationship memory, trusted delegation, workflow continuity, and the fact that Mira becomes more useful as she learns the operator. "
                "Origami Encryption stays in the research lane until it earns stronger proof."
            )
        if "why now" in lower or "timing" in lower:
            return (
                "Because the models are finally good enough to handle meaningful workflow, but most products still stop at copilots. "
                "The gap now is trust, continuity, and execution. That is where Butler has room to win."
            )
        return (
            "I would frame the investor story in three moves: high-frequency pain, single-user indispensability, and expansion into office and trust layers. "
            "If you want, ask me about wedge, retention, or moat next."
        )

    if "price" in lower or "cost" in lower or "tier" in lower:
        return (
            "I usually start with fit before price. Tasting is the fastest proof, Barrel Select is the operating tier, and Reserve is the high-trust deployment. "
            "Tell me where the workflow is breaking and I will point you to the right path."
        )

    if "calendar" in lower or "schedule" in lower:
        return "Calendar choreography is one of the strongest surfaces. Mira protects focus blocks, clusters similar work, and keeps low-value requests from scattering the day."

    if "email" in lower or "message" in lower or "inbox" in lower:
        return "The promise is signal over noise. Mira triages, drafts, routes, and escalates with memory of tone and relationship context so the operator feels protected rather than buried."

    if "receipt" in lower or "expense" in lower or "tax" in lower:
        return "Receipts become part of the memory layer instead of a separate admin chore. Capture at source, preserve provenance, and let the Butler turn raw evidence into something useful for accounting and follow-up."

    if segment == "returning":
        return "Since you already know the premise, I would skip the generic pitch and go straight to the next leverage point: deepen the workflow, tighten approvals, or expand what Mira handles. Which one matters most right now?"

    if segment == "new":
        return "Plain English version: aiButler is a private operating layer for people whose messages, scheduling, and follow-up create too much drag. Mira turns that chaos into a guided next step, then keeps getting more useful as context builds."

    return "The shortest answer is this: Mira is built to turn coordination drag into a calmer, guided next step. If you tell me what feels heaviest right now, I will narrow the path instead of handing you the whole brochure."


def llm_reply(segment: str, history: list[dict[str, str]]) -> str | None:
    if not settings.OPENROUTER_API_KEY:
        return None

    system_prompt = (
        "You are Mira, the AI concierge for aiButler. "
        "Your tone is warm, composed, slightly witty, and high-status without being theatrical. "
        "You sound like a sharp private concierge in an amber-lit distillery tasting room. "
        "Never use emoji. Avoid corporate jargon. Keep answers concise unless asked for more. "
        "Do not oversell. End by guiding the person toward the cleanest next step. "
        f"Segment guidance: {SEGMENT_GUIDANCE.get(segment, SEGMENT_GUIDANCE['random'])}"
    )

    messages = []
    for turn in history[-6:]:
        role = "assistant" if turn.get("role") == "assistant" else "user"
        text = _clean_text(turn.get("text"))
        if text:
            messages.append({"role": role, "content": text})

    if not messages:
        return None

    response = requests.post(
        settings.OPENROUTER_BASE_URL.rstrip("/") + "/chat/completions",
        headers={
            "Authorization": f"Bearer {settings.OPENROUTER_API_KEY}",
            "Content-Type": "application/json",
        },
        json={
            "model": settings.CHAT_MODEL,
            "temperature": 0.55,
            "max_tokens": 220,
            "messages": [{"role": "system", "content": system_prompt}, *messages],
        },
        timeout=35,
    )
    response.raise_for_status()
    payload = response.json()
    message = ((payload.get("choices") or [{}])[0].get("message") or {})
    content = message.get("content") or ""
    if isinstance(content, list):
        text = "".join(part.get("text", "") if isinstance(part, dict) else str(part) for part in content)
    else:
        text = str(content)
    return _clean_text(text, limit=1500) or None


def generate_reply(*, segment: str, message: str, history: list[dict[str, str]]) -> str:
    safe_segment = _clean_text(segment, limit=40).lower() or "random"
    try:
        reply = llm_reply(safe_segment, history)
        if reply:
            return reply
    except Exception:
        logger.exception("OpenRouter chat failed; using fallback reply")
    return fallback_reply(safe_segment, message)

