# Tasks for Issue #3 — Add Auth

## Task 1 — User model
File: `backend/src/models/User.ts`
- Define schema with `username: string` (required, unique) and `password: string` (required)
- Export `IUser` interface and `User` model
- **Acceptance:** `tsc --noEmit` passes; `User.create({ username, password })` is callable

## Task 2 — Auth controller
File: `backend/src/controllers/authController.ts`
- `login`: receive `{ username, password }`; if user exists validate password with bcrypt; if not, hash password and create user; sign JWT with `{ id, username }` using `JWT_SECRET`; return `{ token, user: { id, username } }`
- `logout`: return `200 { message: "Logged out" }` (stateless JWT — actual clearing is client-side)
- `me`: reads `req.user` (set by auth middleware); returns `{ id, username }`
- **Acceptance:** `tsc --noEmit` passes; `POST /api/auth/login` with new credentials creates user and returns token; same credentials again returns token; wrong password returns 401 with `"Invalid username or password."`

## Task 3 — Auth routes
File: `backend/src/routes/auth.ts`
- Wire `POST /api/auth/login` → `login`
- Wire `POST /api/auth/logout` → `logout`
- Wire `GET /api/auth/me` → `me` (protected — apply auth middleware here)
- **Acceptance:** `tsc --noEmit` passes; routes are exported as a router

## Task 4 — Express type declaration + auth middleware
Files: `backend/src/types/express.d.ts`, `backend/src/middleware/auth.ts`
- `express.d.ts`: declaration merge adding `user?: { id: string; username: string }` to `Express.Request`
- `auth.ts`: extract `Authorization: Bearer <token>` header; verify with `jsonwebtoken`; attach decoded payload to `req.user`; throw 401 if missing or invalid
- **Acceptance:** `tsc --noEmit` passes; `req.user` is accessible in controllers without type errors; missing/invalid token returns `401 { message: "Unauthorized" }`

## Task 5 — Update Post model
File: `backend/src/models/Post.ts`
- Replace `username: string` field with `userId: Schema.Types.ObjectId` (ref: `"User"`, required)
- Remove `username` from `IPost` interface
- **Acceptance:** `tsc --noEmit` passes; old `username` field no longer in schema

## Task 6 — Update post controller
File: `backend/src/controllers/postController.ts`
- `createPost`: set `userId: req.user!.id` on the new post
- `getPosts`: filter `Post.find({ userId: req.user!.id })`, sort newest-first
- `deletePost`: find post by id; if `post.userId.toString() !== req.user!.id` throw 403; then delete
- **Acceptance:** `tsc --noEmit` passes; authenticated user can only see and delete their own posts; deleting another user's post returns 403

## Task 7 — Wire auth into app.ts
File: `backend/src/app.ts`
- Import and mount auth router at `/api/auth`
- Apply `authMiddleware` to the posts router (all post routes now require a valid token)
- **Acceptance:** `tsc --noEmit` passes; `GET /api/posts` without token returns 401; with valid token returns posts

## Task 8 — Install react-router-dom
File: `frontend/package.json`
- Run `npm install react-router-dom` in `frontend/`
- **Acceptance:** `npm run build` passes; `react-router-dom` appears in `dependencies`

## Task 9 — authService + postService
Files: `frontend/src/services/authService.ts`, `frontend/src/services/postService.ts`
- `authService`: `login(username, password)` → POST `/api/auth/login`; `logout(token)` → POST `/api/auth/logout`; `me(token)` → GET `/api/auth/me`
- `postService`: `getPosts(token)`, `createPost(token, data)`, `deletePost(token, id)` — each sets `Authorization: Bearer <token>` header
- All functions return typed results; throw `Error` on non-ok responses
- **Acceptance:** `tsc --noEmit` passes; services are importable with correct TypeScript types

## Task 10 — AuthContext
File: `frontend/src/context/AuthContext.tsx`
- Context value type: `{ isAuthenticated: boolean; user: { id: string; username: string } | null; token: string | null; login: (username, password) => Promise<void>; logout: () => void }`
- On mount: check localStorage for stored token; call `authService.me(token)` to verify; set state if valid, clear if not
- `login()`: calls `authService.login()`; stores token in localStorage; sets state
- `logout()`: calls `authService.logout()`; removes token from localStorage; clears state
- Export `useAuth` hook
- **Acceptance:** `tsc --noEmit` passes; valid stored token restores session on page refresh; invalid token clears to unauthenticated

## Task 11 — LoginPage
File: `frontend/src/pages/LoginPage.tsx`
- Controlled form with `username` and `password` inputs and a "Log in / Sign up" button
- On submit: calls `login()` from `useAuth`; shows `"Unable to log in. Please try again."` on request failure; shows `"Invalid username or password."` on 401
- If already authenticated, redirects to `/feed`
- Add styles to `frontend/src/styles.css` for the login page layout
- **Acceptance:** `tsc --noEmit` passes; form renders at `/login`; successful login redirects to `/feed`; error messages display correctly

## Task 12 — ProtectedRoute
File: `frontend/src/components/ProtectedRoute.tsx`
- Reads `isAuthenticated` from `useAuth`
- If authenticated: render `children`
- If not: redirect to `/login`
- **Acceptance:** `tsc --noEmit` passes; unauthenticated access to `/feed` redirects to `/login`; authenticated access renders children

## Task 13 — App.tsx routing + logout
File: `frontend/src/App.tsx`
- Wrap tree with `<AuthProvider>` and `<BrowserRouter>`
- Define routes: `/login` → `<LoginPage>`, `/feed` → `<ProtectedRoute><FeedPage/></ProtectedRoute>`, `/` → redirect to `/feed`
- Move `PostForm` + `Feed` into the `/feed` route; display logged-in username + Logout button in header
- `Logout` button calls `logout()` from `useAuth`
- **Acceptance:** `tsc --noEmit` passes; navigating to `/` redirects to `/feed`; logout button appears in header; clicking logout redirects to `/login`

## Task 14 — Update Feed.tsx
File: `frontend/src/components/Feed.tsx`
- Remove direct `fetch` calls; use `postService.getPosts(token)` and `postService.deletePost(token, id)` from `useAuth` token
- Remove `username` from `Post` type; show auth user's username (from `useAuth`) in each card instead
- All other behaviour (optimistic delete, ConfirmDialog, error display) unchanged
- **Acceptance:** `tsc --noEmit` passes; feed loads and displays posts for the authenticated user; delete still works; unauthenticated access redirects to login

## Task 15 — Update PostForm.tsx
File: `frontend/src/components/PostForm.tsx`
- Remove direct `fetch` call; use `postService.createPost(token, { title, description })` from `useAuth` token
- All other behaviour (controlled inputs, error display, `onPostCreated` callback) unchanged
- **Acceptance:** `tsc --noEmit` passes; creating a post works when authenticated; new post appears in feed
