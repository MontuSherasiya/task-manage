# AI_USAGE.md — How AI Tools Were Used

This document describes how AI tools (Claude by Anthropic) were used in building this project.

---

## Tool Used
**Claude (claude.ai)** — Anthropic's AI assistant

---

## What Was Generated with AI

### 1. Project Architecture
- AI suggested the folder structure separating `backend/` and `frontend/`
- Recommended using Express + Mongoose for the backend and Next.js App Router for frontend

### 2. Backend Code
- `src/models/Task.ts` — Mongoose schema with proper types and validation rules
- `src/routes/tasks.ts` — All 5 API endpoints (GET, POST, PUT, DELETE, PATCH /complete)
- `src/index.ts` — Express server setup with CORS and MongoDB connection
- Logical validation logic for "mark complete" (due date + description length checks)

### 3. Frontend Code
- `types/task.ts` — TypeScript interfaces
- `lib/api.ts` — Axios-based API service layer
- `components/TaskCard.tsx` — Task display card with actions
- `components/TaskForm.tsx` — Create/edit modal form with validation
- `app/page.tsx` — Main page with stats, filters, and task grid

### 4. Configuration Files
- `tsconfig.json` for both frontend and backend
- `.env.example` and `.env.local.example`
- `package.json` scripts

### 5. Documentation
- `README.md` with full setup instructions and API reference
- This `AI_USAGE.md` file

---

## What Was Manually Done / Verified

- Reviewed all logic for correctness
- Tested API endpoints manually
- Verified validation rules match the specification
- Deployment configuration adjustments

---

## Prompts Used (Summary)

1. "Build a complete Task Management Application with Next.js TypeScript Tailwind CSS and Express MongoDB"
2. AI read the full specification PDF and generated all code files in a structured sequence
3. Follow-up prompts to fine-tune validation messages and UI styling

---

## Notes

- All generated code was reviewed for correctness before submission
- AI accelerated development significantly — estimated time saved: 2–3 hours
- The logical validation (no completion without due date + 20-char description) was implemented exactly as specified
