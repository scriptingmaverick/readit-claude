# Plan for Issue #1 — Post Creation Feature

## Files to Add

| File | What |
|---|---|
| `backend/src/models/Post.ts` | Mongoose schema: `title`, `description`, `username`, `createdAt` |
| `backend/src/controllers/postController.ts` | `createPost` and `getPosts` handlers |
| `backend/src/routes/posts.ts` | `POST /api/posts` and `GET /api/posts` wired to controllers |
| `backend/src/utils/errorHandler.ts` | Express error middleware (last `app.use`) |
| `backend/src/config/db.ts` | Mongoose `connect()` call, reads `MONGO_URI` from env |
| `frontend/src/components/PostForm.tsx` | Form with title input, description textarea, Post button |
| `frontend/src/components/Feed.tsx` | Ordered list of posts — username, title, description, time |

## Files to Modify

| File | Change |
|---|---|
| `backend/src/server.ts` | Call `connectDB()` before `app.listen` |
| `backend/src/app.ts` | Mount `postsRouter` at `/api/posts`; add `errorHandler` as last middleware |
| `frontend/vite.config.ts` | Add `/api` proxy to `http://localhost:4000` |
| `frontend/src/App.tsx` | Replace placeholder content with `<PostForm>` + `<Feed>` |
| `frontend/src/styles.css` | Add styles for form and feed cards |

## Impact Areas

- `backend/src/app.ts` — changes are additive; existing `GET /api` health check stays intact
- `backend/src/server.ts` — DB connection added before listen; server will fail to start if `MONGO_URI` is not set in `.env`

## Out of Scope

- Auth routes, `authController.ts`, `User.ts` — not touched
- Login/registration UI
- Image uploads, voting, comments, subreddits
