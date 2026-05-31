# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Reddit-style clone built with Express + MongoDB on the backend and React 18 + Vite on the frontend. The two packages are completely separate — no root-level package.json — so all commands must be run from within `backend/` or `frontend/`.

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
- `JWT_SECRET` — secret for signing JWTs (auth not yet implemented)
- `PORT` — defaults to `4000`

## Architecture

### Backend (Express + TypeScript + MongoDB/Mongoose)

`src/server.ts` loads env, calls `connectDB()`, then starts the HTTP server. `src/app.ts` configures middleware and mounts all routers.

Layered structure (all implemented):
- `src/config/db.ts` — Mongoose connection; throws if `MONGO_URI` is unset
- `src/models/Post.ts` — Post schema: `title`, `description`, `username` (default `"Anonymous"`), `createdAt`
- `src/models/User.ts` — scaffold only, not yet implemented
- `src/routes/posts.ts` — mounts at `/api/posts`
- `src/controllers/postController.ts` — `createPost`, `getPosts`, `deletePost`
- `src/utils/errorHandler.ts` — last middleware in `app.ts`; reads `err.status` for the HTTP code, defaults to 500

`express-async-errors` is imported at the top of `app.ts` so async controller errors propagate to `errorHandler` automatically — no `try/catch` needed in controllers. To return a specific HTTP status from a controller, attach it to the error: `Object.assign(new Error("msg"), { status: 404 })`.

TypeScript is strict (`noUnusedLocals`, `noUnusedParameters`) — the build fails if unused symbols are left in.

### API routes

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api` | Health check |
| GET | `/api/posts` | Fetch all posts, newest first |
| POST | `/api/posts` | Create a post (`title`, `description` required) |
| DELETE | `/api/posts/:id` | Delete a post by MongoDB `_id` |

### Frontend (React 18 + Vite + TypeScript)

Single-page app. `src/App.tsx` is the root; it manages a `refreshKey` counter that increments after each new post to trigger feed re-fetch.

Components:
- `src/components/PostForm.tsx` — controlled form; POSTs to `/api/posts`, calls `onPostCreated()` on success, shows inline error on failure
- `src/components/Feed.tsx` — fetches posts on mount and on `refreshKey` change; each card has a Delete button that opens `ConfirmDialog`; uses optimistic delete (restores post on API failure)
- `src/components/ConfirmDialog.tsx` — modal overlay; clicking outside the card dismisses it

The Vite dev server proxies all `/api` requests to `http://localhost:4000` (configured in `vite.config.ts`). Auth routes (`src/routes/auth.ts`, `src/controllers/authController.ts`) are scaffolded but not yet implemented.
