import { useEffect, useState } from "react";
import { ConfirmDialog } from "./ConfirmDialog";
import { useAuth } from "../context/AuthContext";
import { postService, Post } from "../services/postService";

type Props = {
  refreshKey: number;
};

const timeAgo = (dateStr: string): string => {
  const seconds = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (seconds < 60) return "just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
};

export const Feed = ({ refreshKey }: Props) => {
  const { token, user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState("");
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!token) return;
    postService
      .getPosts(token)
      .then(setPosts)
      .catch((err) => setError((err as Error).message));
  }, [refreshKey, token]);

  const handleConfirmDelete = async () => {
    if (!pendingDeleteId || !token) return;
    const id = pendingDeleteId;
    setPendingDeleteId(null);

    const snapshot = posts;
    setPosts((prev) => prev.filter((p) => p._id !== id));

    try {
      await postService.deletePost(token, id);
    } catch (err) {
      setPosts(snapshot);
      setDeleteError((prev) => ({ ...prev, [id]: (err as Error).message }));
    }
  };

  if (error) return <p className="feed__error">{error}</p>;

  return (
    <>
      {pendingDeleteId && (
        <ConfirmDialog
          message="Are you sure you want to delete this post?"
          onConfirm={handleConfirmDelete}
          onCancel={() => setPendingDeleteId(null)}
        />
      )}
      <div className="feed">
        {posts.length === 0 && <p className="feed__empty">No posts yet. Be the first!</p>}
        {posts.map((post) => (
          <div key={post._id} className="feed__card">
            <div className="feed__meta">
              <span className="feed__username">{user?.username}</span>
              <span className="feed__time">{timeAgo(post.createdAt)}</span>
              <button
                className="feed__delete-btn"
                onClick={() => setPendingDeleteId(post._id)}
              >
                Delete
              </button>
            </div>
            <h3 className="feed__title">{post.title}</h3>
            <p className="feed__description">{post.description}</p>
            {deleteError[post._id] && (
              <p className="feed__delete-error">{deleteError[post._id]}</p>
            )}
          </div>
        ))}
      </div>
    </>
  );
};
