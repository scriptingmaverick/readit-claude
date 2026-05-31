# Plan for Issue #2 — Delete Post Feature

## Code Reuse Found

- `Post` interface in `Feed.tsx` already includes `_id` — usable directly for the delete API call, no changes needed to the type
- `postController.ts` already imports `Post` model and uses `RequestHandler` — `deletePost` follows the exact same pattern
- `errorHandler` middleware already catches thrown errors — no extra error wiring needed in the new controller
- `.feed__meta` already uses `display: flex` — the Delete button slots in naturally by adding `margin-left: auto`

## Files to Add

| File | What |
|---|---|
| `frontend/src/components/ConfirmDialog.tsx` | Modal with "Are you sure?" message, Cancel and Delete buttons |

## Files to Modify

| File | Change |
|---|---|
| `backend/src/controllers/postController.ts` | Add `deletePost`: finds by `_id`, deletes, returns `200`; throws `404` if not found |
| `backend/src/routes/posts.ts` | Add `DELETE /:id` → `deletePost` |
| `frontend/src/components/Feed.tsx` | Add Delete button per card; manage `pendingDeleteId` state; wire `ConfirmDialog`; optimistically remove post on confirm, restore on error |
| `frontend/src/styles.css` | Styles for `.feed__delete-btn` and `.confirm-dialog` overlay/modal |

## Impact Areas

- `Feed.tsx` — render logic is extended, not rewritten; existing fetch + `refreshKey` behaviour untouched
- `backend/src/routes/posts.ts` — additive only; existing `GET /` and `POST /` routes unaffected

## Out of Scope

- Post recovery / soft delete
- Bulk deletion
- Ownership / auth checks
