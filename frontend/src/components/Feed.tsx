import { useEffect, useState } from "react";

interface Post {
  _id: string;
  title: string;
  description: string;
  username: string;
  createdAt: string;
}

interface Props {
  refreshKey: number;
}

function timeAgo(dateStr: string): string {
  const seconds = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (seconds < 60) return "just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}

export function Feed({ refreshKey }: Props) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/posts")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load posts");
        return res.json() as Promise<Post[]>;
      })
      .then(setPosts)
      .catch((err) => setError((err as Error).message));
  }, [refreshKey]);

  if (error) return <p className="feed__error">{error}</p>;

  return (
    <div className="feed">
      {posts.length === 0 && <p className="feed__empty">No posts yet. Be the first!</p>}
      {posts.map((post) => (
        <div key={post._id} className="feed__card">
          <div className="feed__meta">
            <span className="feed__username">{post.username}</span>
            <span className="feed__time">{timeAgo(post.createdAt)}</span>
          </div>
          <h3 className="feed__title">{post.title}</h3>
          <p className="feed__description">{post.description}</p>
        </div>
      ))}
    </div>
  );
}
