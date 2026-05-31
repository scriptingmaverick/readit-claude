# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Reddit-style clone scaffold. The backend and frontend are separate packages with no root-level package.json — all commands must be run from within `backend/` or `frontend/`.

## Commands

### Backend (`cd backend` first)

```bash
npm run dev       # start with ts-node-dev (hot reload)
npm run build     # compile TypeScript to dist/
npm start         # run compiled output from dist/server.js
npm run lint      # ESLint on .ts files
npm run format    # Prettier
```

### Frontend (`cd frontend` first)

```bash
npm run dev       # Vite dev server on http://localhost:5173
npm run build     # tsc + Vite production build
npm run preview   # preview production build locally
```

## Environment setup

Copy `backend/.env.example` to `backend/.env` and set:

- `MONGO_URI` — MongoDB connection string (default: `mongodb://127.0.0.1:27017/readit-claude`)
- `JWT_SECRET` — secret for signing JWTs
- `PORT` — defaults to `4000`

## Architecture

### Backend (Express + TypeScript + MongoDB/Mongoose)

The app is wired in two files: `src/server.ts` starts the HTTP server; `src/app.ts` configures Express middleware and mounts routes. The current `app.ts` only exposes `GET /api` — routes, controllers, and the MongoDB connection are all scaffolded but empty.

The intended layered structure:
- `src/config/db.ts` — Mongoose connection (call from `server.ts` before `app.listen`)
- `src/models/` — Mongoose schemas (`User.ts`, `Post.ts`)
- `src/routes/` — Express routers (`auth.ts`, `posts.ts`), to be mounted in `app.ts`
- `src/controllers/` — request handlers called by the routers
- `src/utils/errorHandler.ts` — Express error middleware (should be the last `app.use` in `app.ts`)

Auth is JWT-based (`jsonwebtoken`). Passwords use `bcryptjs`. `express-async-errors` is included so async controller errors propagate to the error middleware automatically — no need for `try/catch` wrappers in controllers.

TypeScript is strict with `noUnusedLocals` and `noUnusedParameters` enabled; the build will fail if unused symbols are left in.

### Frontend (React 18 + Vite + TypeScript)

Single-page React app, bootstrapped in `src/main.tsx`, root component in `src/App.tsx`. No routing library or state management is wired up yet — those need to be added. The Vite dev server runs on port 5173; add a `proxy` entry in `vite.config.ts` to forward `/api` requests to the backend on port 4000 when integrating the two.
