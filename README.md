# aiButler.me

Standalone public Butler repo extracted from the broader Mira Platform workspace.

What lives here:
- the public segmented Butler site
- the Mira chat experience
- the Origami Encryption research surface
- a lean backend for chat streaming and lead capture
- legacy static Butler pages archived under `legacy/`

Deployment today:
- frontend can deploy directly to GitHub Pages via `.github/workflows/deploy-pages.yml`
- the frontend is safe to deploy without the backend; chat falls back to local copy-driven replies and lead capture falls back to direct email handoff
- the backend remains the path for live SSE chat and persisted lead capture when deployed separately

## Local run

Backend:
```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8001
```

Frontend:
```bash
cd frontend
npm install
npm run dev
```

Open:
- site: `http://localhost:5173`
- backend docs: `http://127.0.0.1:8001/docs`

## Environment

Frontend:
- `VITE_BASE_PATH=/` for local or custom-domain deploys
- `VITE_API_BASE=http://127.0.0.1:8001`
- `VITE_POSTHOG_KEY=...` optional
- `VITE_POSTHOG_HOST=...` optional

Backend:
- `OPENROUTER_API_KEY=...` optional
- `CHAT_MODEL=anthropic/claude-sonnet-4.5` optional
- `CORS_ALLOWED_ORIGINS=http://localhost:5173,http://127.0.0.1:5173`

If `OPENROUTER_API_KEY` is not set, Mira falls back to local copy-driven replies so the site is still testable.
