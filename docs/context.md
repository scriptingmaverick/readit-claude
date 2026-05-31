# Issue #3: Add Auth — Context

## Goal

Introduce basic authentication so users must log in before accessing the app. Combined signup/login: if the username exists → validate password; if not → auto-create account and log in.

## Backend (all scaffolding already exists)

1. **`User` model** — implement schema with `username` and `password` fields (bcryptjs already installed for hashing)
2. **`authController.ts`** — implement `login` (create-or-authenticate), `logout`, and `me`
3. **`auth.ts` routes** — wire up `POST /api/auth/login`, `POST /api/auth/logout`, `GET /api/auth/me`
4. **`Post` model** — replace `username: string` with `userId: ObjectId` (ref to User)
5. **`postController.ts`** — `createPost` attaches `userId`; `getPosts` filters by user; `deletePost` checks ownership
6. **Auth middleware** — protect post routes; validate session/JWT (jsonwebtoken already installed)
7. **`app.ts`** — mount auth router and protect posts router

## Frontend (needs new packages: react-router-dom)

1. **`AuthContext`** — React Context holding `{ isAuthenticated, user, login, logout }`
2. **`LoginPage`** — username + password form, combined signup/login
3. **`ProtectedRoute`** — wrapper that redirects unauthenticated users to `/login`
4. **`App.tsx`** — add React Router with `/login` and `/feed` routes; wrap feed in `ProtectedRoute`
5. **API calls** — attach auth token (from context/storage) to all post requests
6. **Feed** — backend already filters by user, so no frontend changes needed beyond auth

## Error Handling

- Wrong password → "Invalid username or password."
- Request failure → "Unable to log in. Please try again."
- Session expired → redirect to `/login`

## Key Dependencies Already Installed

- `bcryptjs` — password hashing
- `jsonwebtoken` — JWT session management
- React Router DOM — needs to be added to frontend
