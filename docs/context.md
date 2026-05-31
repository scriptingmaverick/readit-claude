# Issue #2 — Delete Post Feature

## Summary

Allows users to delete any post from the feed, with a confirmation step to prevent accidental deletion.

## Frontend

- Each post card in `Feed.tsx` gets a **Delete** button
- Clicking Delete opens a **confirmation dialog** with the message "Are you sure you want to delete this post?" and two actions: **Cancel** and **Delete**
- On confirm: calls `DELETE /api/posts/:id`, removes the card from the feed, shows a success/error message
- If deletion fails (network error, post not found), the post stays visible and an error message is shown
- New `ConfirmDialog` component to handle the dialog UI

## Backend

- `deletePost` controller: finds post by `_id`, deletes it, returns `200`; returns `404` if not found
- `DELETE /api/posts/:id` route wired into `posts.ts`

## Out of Scope

- Post recovery / soft delete
- Bulk deletion
- Ownership checks (any user can delete any post — auth is out of scope)
