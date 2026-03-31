from __future__ import annotations

import json
import sqlite3
from datetime import datetime, timezone
from typing import Any

from app.config import settings


def _connect() -> sqlite3.Connection:
    conn = sqlite3.connect(settings.database_file, check_same_thread=False)
    conn.row_factory = sqlite3.Row
    return conn


def init_db() -> None:
    conn = _connect()
    try:
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS lead_captures (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                email TEXT NOT NULL,
                segment TEXT NOT NULL,
                audience_label TEXT,
                offer TEXT,
                source_path TEXT,
                note TEXT,
                conversation_json TEXT,
                source_ip TEXT,
                created_at TEXT NOT NULL
            )
            """
        )
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS chat_events (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                session_id TEXT NOT NULL,
                segment TEXT NOT NULL,
                source_path TEXT,
                user_message TEXT,
                assistant_reply TEXT,
                created_at TEXT NOT NULL
            )
            """
        )
        conn.commit()
    finally:
        conn.close()


def insert_lead_capture(
    *,
    email: str,
    segment: str,
    audience_label: str,
    offer: str,
    source_path: str,
    note: str,
    conversation: list[dict[str, Any]],
    source_ip: str | None,
) -> None:
    conn = _connect()
    try:
        conn.execute(
            """
            INSERT INTO lead_captures (
                email, segment, audience_label, offer, source_path, note, conversation_json, source_ip, created_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                email,
                segment,
                audience_label,
                offer,
                source_path,
                note,
                json.dumps(conversation, ensure_ascii=False, separators=(",", ":")),
                source_ip,
                datetime.now(timezone.utc).isoformat(),
            ),
        )
        conn.commit()
    finally:
        conn.close()


def insert_chat_event(
    *,
    session_id: str,
    segment: str,
    source_path: str,
    user_message: str,
    assistant_reply: str,
) -> None:
    conn = _connect()
    try:
        conn.execute(
            """
            INSERT INTO chat_events (
                session_id, segment, source_path, user_message, assistant_reply, created_at
            ) VALUES (?, ?, ?, ?, ?, ?)
            """,
            (
                session_id,
                segment,
                source_path,
                user_message,
                assistant_reply,
                datetime.now(timezone.utc).isoformat(),
            ),
        )
        conn.commit()
    finally:
        conn.close()

