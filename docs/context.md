# Issue #1 — Post Creation Feature

## Summary

Build a full-stack post creation and feed feature.

## Frontend

- A `PostForm` component (always visible on the page) with two fields: `title` (text input) and `description` (textarea), plus a "Post" button
- A `Feed` component that lists posts newest-first; each post shows: username, title, description, and time created
- On submit, the form calls the backend API; the new post appears at the top of the feed

## Backend

- `Post` Mongoose model with fields: `title`, `description`, `username`, `createdAt`
- `POST /api/posts` — create a post (saves to MongoDB)
- `GET /api/posts` — fetch all posts sorted newest-first
- Wire routes into `app.ts`, connect MongoDB in `server.ts`

## Error Handling

- Show user-visible error messages for any API failures

## Out of Scope

- Auth/login (username can be a placeholder for now)
- Image uploads
- Any post fields beyond title & description
