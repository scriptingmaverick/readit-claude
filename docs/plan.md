# Plan for Issue #3 — Add Auth

## New Files

### Backend
| File | What |
|---|---|
| `backend/src/models/User.ts` | User schema: `username`, `password` (bcrypt-hashed) |
| `backend/src/middleware/auth.ts` | JWT verification middleware; attaches `req.user` to request |
| `backend/src/types/express.d.ts` | Declaration merge to add `user?: { id, username }` to Express `Request` |

### Frontend
| File | What |
|---|---|
| `frontend/src/context/AuthContext.tsx` | Context + provider: `{ isAuthenticated, user, token, login, logout }` |
| `frontend/src/pages/LoginPage.tsx` | Combined login/signup form (username + password) |
| `frontend/src/components/ProtectedRoute.tsx` | Redirects to `/login` if not authenticated |
| `frontend/src/services/authService.ts` | API calls: `login`, `logout`, `me` |
| `frontend/src/services/postService.ts` | API calls: `getPosts`, `createPost`, `deletePost` |

## Modified Files

### Backend
| File | Change |
|---|---|
| `backend/src/controllers/authController.ts` | Implement `login` (create-or-authenticate), `logout`, `me` |
| `backend/src/routes/auth.ts` | Wire `POST /api/auth/login`, `POST /api/auth/logout`, `GET /api/auth/me` |
| `backend/src/models/Post.ts` | Replace `username: string` with `userId: ObjectId` (ref User) |
| `backend/src/controllers/postController.ts` | `createPost` sets `userId`; `getPosts` filters by `userId`; `deletePost` checks ownership |
| `backend/src/app.ts` | Mount auth router; apply auth middleware to posts router |

### Frontend
| File | Change |
|---|---|
| `frontend/package.json` | Add `react-router-dom` + `@types/react-router-dom` |
| `frontend/src/App.tsx` | Wrap with `AuthProvider` + `BrowserRouter`; add routes `/login` and `/feed`; add logout button in header |
| `frontend/src/components/Feed.tsx` | Use `postService`; remove `username` from Post type; show auth user's name from context; pass token to service |
| `frontend/src/components/PostForm.tsx` | Use `postService`; pass token from context to service |

## Impact / Risk Areas

1. **Existing MongoDB posts** — old posts have `username` but no `userId`; they won't appear in anyone's feed after the model change. DB should be cleared before testing.
2. **`Feed.tsx` Post type** — `username` field removed; display will show the logged-in user's name from context instead.
3. **All unauthenticated API calls** — once auth middleware is applied to the posts router, any request without a valid JWT returns 401.

## Out of Scope

- Email verification, password reset, OAuth, MFA
- User profiles, role-based authorization
- JWT refresh tokens
- Migration of existing posts without `userId`
