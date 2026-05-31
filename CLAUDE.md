# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with
code in this repository.

## Project overview

Reddit-style clone built with Express + MongoDB on the backend and React 18 +
Vite on the frontend. The two packages are completely separate — no root-level
package.json — so all commands must be run from within `backend/` or
`frontend/`.

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

- `MONGO_URI` — MongoDB connection string (default:
  `mongodb://127.0.0.1:27017/readit-claude`)
- `JWT_SECRET` — secret for signing JWTs (auth not yet implemented)
- `PORT` — defaults to `4000`

## Architecture

### Backend (Express + TypeScript + MongoDB/Mongoose)

`src/server.ts` loads env, calls `connectDB()`, then starts the HTTP server.
`src/app.ts` configures middleware and mounts all routers.

Layered structure (all implemented):

- `src/config/db.ts` — Mongoose connection; throws if `MONGO_URI` is unset
- `src/models/Post.ts` — Post schema: `title`, `description`, `username`
  (default `"Anonymous"`), `createdAt`
- `src/models/User.ts` — scaffold only, not yet implemented
- `src/routes/posts.ts` — mounts at `/api/posts`
- `src/controllers/postController.ts` — `createPost`, `getPosts`, `deletePost`
- `src/utils/errorHandler.ts` — last middleware in `app.ts`; reads `err.status`
  for the HTTP code, defaults to 500

`express-async-errors` is imported at the top of `app.ts` so async controller
errors propagate to `errorHandler` automatically — no `try/catch` needed in
controllers. To return a specific HTTP status from a controller, attach it to
the error: `Object.assign(new Error("msg"), { status: 404 })`.

TypeScript is strict (`noUnusedLocals`, `noUnusedParameters`) — the build fails
if unused symbols are left in.

### API routes

| Method | Path             | Description                                     |
| ------ | ---------------- | ----------------------------------------------- |
| GET    | `/api`           | Health check                                    |
| GET    | `/api/posts`     | Fetch all posts, newest first                   |
| POST   | `/api/posts`     | Create a post (`title`, `description` required) |
| DELETE | `/api/posts/:id` | Delete a post by MongoDB `_id`                  |

### Frontend (React 18 + Vite + TypeScript)

Single-page app. `src/App.tsx` is the root; it manages a `refreshKey` counter
that increments after each new post to trigger feed re-fetch.

Components:

- `src/components/PostForm.tsx` — controlled form; POSTs to `/api/posts`, calls
  `onPostCreated()` on success, shows inline error on failure
- `src/components/Feed.tsx` — fetches posts on mount and on `refreshKey` change;
  each card has a Delete button that opens `ConfirmDialog`; uses optimistic
  delete (restores post on API failure)
- `src/components/ConfirmDialog.tsx` — modal overlay; clicking outside the card
  dismisses it

The Vite dev server proxies all `/api` requests to `http://localhost:4000`
(configured in `vite.config.ts`). Auth routes (`src/routes/auth.ts`,
`src/controllers/authController.ts`) are scaffolded but not yet implemented.

# Coding Standards

## General Principles

- Prioritize readability over clever code.
- Prefer explicit code over implicit behavior.
- Keep components small and focused.
- Avoid premature optimization.
- Follow the Single Responsibility Principle.

---

# TypeScript Standards

## Types

- Avoid using `any`.
- Prefer `type` over `interface` unless interface extension is required.
- Explicitly type function parameters and return values.
- Use union types instead of enums when possible.

Good:

```ts
type Status = "idle" | "loading" | "success" | "error";
```

Bad:

```ts
enum Status {
  Idle,
  Loading,
  Success,
  Error,
}
```

---

## Functions

- Prefer arrow functions.
- Keep functions under 20-25 lines when practical.
- Extract complex logic into reusable utilities.

Good:

```ts
const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((sum, item) => sum + item.price, 0);
};
```

---

## Imports

- Use absolute imports with aliases.
- Avoid deep relative imports.

Good:

```ts
import { Button } from "@/components/ui/Button";
```

Bad:

```ts
import { Button } from "../../../../components/ui/Button";
```

---

# React Standards

## Components

- One component per file.
- Use functional components only.
- Export components as named exports.
- Keep components focused on a single responsibility.

Good:

```tsx
export const UserCard = () => {
  return <div>User</div>;
};
```

Bad:

```tsx
export default function UserCard() {
  return <div>User</div>;
}
```

---

## Props

- Define props using dedicated types.

Good:

```tsx
type UserCardProps = {
  name: string;
};

export const UserCard = ({ name }: UserCardProps) => {
  return <div>{name}</div>;
};
```

---

## State

- Keep state as local as possible.
- Avoid prop drilling more than 2-3 levels.
- Use Context only for truly global state.
- Prefer React Query for server state.

---

## Hooks

- Keep hooks at the top level.
- Extract reusable logic into custom hooks.
- Custom hooks must start with `use`.

Good:

```ts
const usePosts = () => {
  // logic
};
```

---

# File Structure

```
src/
├── app/
├── pages/
├── features/
├── components/
│   ├── ui/
│   └── shared/
├── hooks/
├── services/
├── lib/
├── types/
└── assets/
```

---

# Feature Structure

```
features/
└── posts/
    ├── api/
    ├── components/
    ├── hooks/
    ├── types/
    └── utils/
```

---

# API Calls

- Never call APIs directly inside UI components.
- API logic belongs in services or feature api folders.

Good:

```ts
const posts = await postService.getPosts();
```

Bad:

```ts
fetch("/api/posts");
```

inside components.

---

# Styling

- Use Tailwind utility classes.
- Avoid inline styles.
- Extract repeated class combinations into reusable components.

Bad:

```tsx
<div style={{ marginTop: 20 }}>
```

---

# Error Handling

- Never silently swallow errors.
- Always handle async failures.

Good:

```ts
try {
  await createPost(data);
} catch (error) {
  console.error(error);
  toast.error("Failed to create post");
}
```

---

# Naming Conventions

## Components

```text
PascalCase
```

Examples:

```text
UserCard
PostList
CreatePostForm
```

## Hooks

```text
useSomething
```

Examples:

```text
usePosts
useCreatePost
useAuth
```

## Types

```text
PascalCase
```

Examples:

```text
User
Post
CreatePostRequest
```

## Variables

```text
camelCase
```

Examples:

```text
userName
postCount
```

---

# Testing

- Test behavior, not implementation.
- Use React Testing Library.
- Avoid testing internal state.
- Prefer user-centric assertions.

Good:

```ts
expect(screen.getByText("Create Post")).toBeVisible();
```

Bad:

```ts
expect(component.state.isOpen).toBe(true);
```

---

# Code Review Rules

Reject code that:

- Uses `any`.
- Contains dead code.
- Uses default exports.
- Has duplicated business logic.
- Makes API calls directly from UI components.
- Contains commented-out code.
- Violates feature boundaries.
