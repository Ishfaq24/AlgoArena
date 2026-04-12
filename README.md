# AlgoArena

AlgoArena is a full-stack practice platform for coding, mock tests, interview-style sessions, and AI-powered learning workflows.

This repository currently contains:

- A React + Vite frontend
- An Express + MongoDB backend API
- A FastAPI-based ML/video-generation service (Manim + LLM + narration)

## Architecture

- Frontend (`frontend/`): React 18 app (Vite) with Clerk auth, session UI, AI tutor views, dashboard, tests, and video call screens.
- Backend (`backend/src/`): Express API with Clerk-protected routes, MongoDB models, Gemini integration, Stream token endpoint, and dashboard/test/session APIs.
- ML service (`ml-services/`): FastAPI service that generates Manim scenes and rendered videos from a topic.

For detailed design notes, see `ARCHITECTURE.md`.

## Repository Layout

```text
AlgoArena/
|- ARCHITECTURE.md
|- package.json
|- README.md
|- backend/
|  |- package.json
|  |- requirements.txt
|  |- src/                 # Node/Express backend
|  |- app/                 # Python FastAPI app (mirrors ml-services)
|  |- generated/
|  |- media/
|  \- test_nvidia_api.py
|- frontend/
|  |- package.json
|  \- src/
\- ml-services/
   |- requirements.txt
   |- app/                 # FastAPI video generation API
   |- generated/
   \- media/
```

## Tech Stack

- Frontend: React, Vite, Tailwind CSS, DaisyUI, React Query, Monaco Editor, Stream Video SDK
- Backend: Node.js, Express, Mongoose, Clerk, Gemini, Inngest, Stream Chat
- ML service: FastAPI, Uvicorn, Manim, Google Generative AI, gTTS/pyttsx3
- Database: MongoDB

## Prerequisites

- Node.js 18+
- npm 9+
- Python 3.10+
- MongoDB instance (local or cloud)
- Manim runtime dependencies installed on your machine

## Environment Variables

Create the following environment files before running services.

### `backend/.env`

```env
PORT=3000
DB_URL=<mongodb_connection_string>
CLIENT_URL=http://localhost:5173
NODE_ENV=development

CLERK_PUBLISHABLE_KEY=<clerk_publishable_key>
CLERK_SECRET_KEY=<clerk_secret_key>

GEMINI_API_KEY=<gemini_api_key>

STREAM_API_KEY=<stream_api_key>
STREAM_API_SECRET=<stream_api_secret>

INNGEST_EVENT_KEY=<inngest_event_key>
INNGEST_SIGNING_KEY=<inngest_signing_key>
```

### `frontend/.env`

```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_CLERK_PUBLISHABLE_KEY=<clerk_publishable_key>
VITE_STREAM_API_KEY=<stream_api_key>
VITE_API_KEY=<gemini_api_key>
```

### `ml-services/.env` (if required by your LLM/voice setup)

```env
GEMINI_API_KEY=<gemini_api_key>
```

## Local Development

Run services in separate terminals.

### 1) Backend API (Express)

```bash
cd backend
npm install
npm run dev
```

Backend runs at `http://localhost:3000`.

### 2) Frontend (React + Vite)

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:5173`.

### 3) ML Service (FastAPI)

```bash
cd ml-services
python -m venv .venv
# Windows PowerShell
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

ML service runs at `http://localhost:8000`.

Note: A similar Python app also exists under `backend/app/`; prefer `ml-services/` as the dedicated service folder unless you intentionally run the backend copy.

## Root Scripts

From repository root:

```bash
npm run build
npm run start
```

- `build`: installs backend/frontend dependencies and builds frontend.
- `start`: starts backend (`backend/src/server.js`).

## API Summary

### Backend API base

- `GET /health`
- `POST /api/ai/tutor` (protected)
- `GET /api/chat/token` (protected)
- `POST /api/sessions/` (protected)
- `GET /api/sessions/active` (protected)
- `GET /api/sessions/my-recent` (protected)
- `GET /api/sessions/:id` (protected)
- `POST /api/sessions/:id/join` (protected)
- `POST /api/sessions/:id/end` (protected)
- `GET /api/dashboard/` (protected)
- `PUT /api/dashboard/stats` (protected)
- `POST /api/dashboard/activity` (protected)
- `PUT /api/dashboard/goals` (protected)
- `POST /api/tests/generate`

### ML service API base

- `GET /`
- `GET /health`
- `POST /generate`
- `GET /video`

## Production Notes

- In production mode, the backend serves static frontend files from `frontend/dist`.
- Ensure `NODE_ENV=production` and the frontend build artifacts are available.

## Additional Docs

- `ARCHITECTURE.md`: system architecture and flow documentation.
- `frontend/README.md`: Vite frontend scaffold notes.
