# Tasks for Issue #1 — Post Creation Feature

## Task 1 — MongoDB connection
Files: `backend/src/config/db.ts`, `backend/src/server.ts`
- Implement `connectDB()` in `db.ts` using `mongoose.connect(process.env.MONGO_URI)`
- Load `dotenv` and call `connectDB()` in `server.ts` before `app.listen`
- **Acceptance:** `npm run dev` starts without a DB error when `MONGO_URI` is set in `.env`

## Task 2 — Post Mongoose model
File: `backend/src/models/Post.ts`
- Schema fields: `title` (String, required), `description` (String, required), `username` (String, default `"Anonymous"`), `createdAt` (Date, default `Date.now`)
- **Acceptance:** TypeScript compiles; model is importable from other files

## Task 3 — Post controllers
File: `backend/src/controllers/postController.ts`
- `createPost`: validates title + description, saves a new Post, returns `201` with the created post
- `getPosts`: returns all posts sorted by `createdAt` descending
- **Acceptance:** Each handler has the correct Express `RequestHandler` signature; TypeScript compiles

## Task 4 — Post routes
File: `backend/src/routes/posts.ts`
- `POST /` → `createPost`, `GET /` → `getPosts`
- **Acceptance:** File exports an Express `Router`; TypeScript compiles

## Task 5 — Error handler middleware
File: `backend/src/utils/errorHandler.ts`
- Four-argument Express error middleware `(err, req, res, next)`
- Returns `{ message }` JSON with the appropriate HTTP status code
- **Acceptance:** Middleware has the correct signature; TypeScript compiles

## Task 6 — Wire backend together
File: `backend/src/app.ts`
- Import `express-async-errors` at the top
- Mount `postsRouter` at `/api/posts`
- Add `errorHandler` as the last middleware
- **Acceptance:** `curl http://localhost:4000/api/posts` returns `[]`; `curl -X POST` with `title` + `description` returns `201`

## Task 7 — Vite proxy
File: `frontend/vite.config.ts`
- Add `server.proxy` entry: `/api` → `http://localhost:4000`
- **Acceptance:** Frontend dev server forwards `/api` requests to the backend without CORS errors

## Task 8 — PostForm component
File: `frontend/src/components/PostForm.tsx`
- Controlled inputs for `title` and `description`, a Post button
- On submit: `POST /api/posts`, clears the form, calls an `onPostCreated` callback
- Shows an inline error message on API failure
- **Acceptance:** Form submits successfully and clears; error message appears on failure

## Task 9 — Feed component
File: `frontend/src/components/Feed.tsx`
- Fetches `GET /api/posts` on mount and whenever `refreshKey` prop changes
- Renders each post with username, title, description, and formatted `createdAt`
- **Acceptance:** Existing posts render on load; after a new post is submitted the feed updates with it at the top

## Task 10 — Wire App
File: `frontend/src/App.tsx`
- Replace placeholder with `<PostForm>` and `<Feed>`
- Manage a `refreshKey` counter that increments after each successful post to trigger feed refresh
- **Acceptance:** Full user journey works end-to-end in the browser

## Task 11 — Styles
File: `frontend/src/styles.css`
- Styles for the form card, inputs/textarea, submit button, and feed post cards
- **Acceptance:** UI is clean and readable; no unstyled raw elements
