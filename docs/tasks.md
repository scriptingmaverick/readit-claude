# Tasks for Issue #2 — Delete Post Feature

## Task 1 — `deletePost` controller
File: `backend/src/controllers/postController.ts`
- Find post by `req.params.id` using `findByIdAndDelete`
- Return `200` with the deleted post document
- If not found, throw an error with `status: 404` so `errorHandler` returns the right HTTP code
- **Acceptance:** `tsc --noEmit` passes; `curl -X DELETE /api/posts/:id` returns `200` with the post; a non-existent ID returns `404 { message: "Post not found" }`

## Task 2 — Delete route
File: `backend/src/routes/posts.ts`
- Add `router.delete("/:id", deletePost)`
- **Acceptance:** `tsc --noEmit` passes; existing `GET /` and `POST /` routes untouched

## Task 3 — ConfirmDialog component
File: `frontend/src/components/ConfirmDialog.tsx`
- Props: `message: string`, `onConfirm: () => void`, `onCancel: () => void`
- Renders a full-screen overlay with a modal card containing the message and two buttons: **Cancel** (neutral) and **Delete** (danger/red)
- **Acceptance:** Vite build passes; component is importable

## Task 4 — Wire delete into Feed
File: `frontend/src/components/Feed.tsx`
- Add a Delete button to each post card's meta row
- Add `pendingDeleteId: string | null` state; clicking Delete sets it to that post's `_id`
- Render `<ConfirmDialog>` when `pendingDeleteId` is set
- On confirm: optimistically remove the post from local `posts` state → call `DELETE /api/posts/:id` → if it fails, restore the post and show a per-card error message
- On cancel: clear `pendingDeleteId`
- **Acceptance:** Vite build passes; Delete button appears on every card; clicking opens dialog; Cancel closes it without changes; Confirm removes the post from the feed

## Task 5 — Styles for delete button and dialog
File: `frontend/src/styles.css`
- `.feed__delete-btn` — small muted button, pushed to the right of the meta row via `margin-left: auto`; turns red on hover
- `.confirm-dialog__overlay` — full-screen semi-transparent backdrop
- `.confirm-dialog__card` — centred white card with message text and action buttons
- **Acceptance:** Vite build passes; UI matches the issue spec (overlay + card + two buttons); delete button is unobtrusive on the card
