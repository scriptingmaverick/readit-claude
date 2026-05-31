export type Post = {
  _id: string;
  userId: string;
  title: string;
  description: string;
  createdAt: string;
};

type CreatePostData = { title: string; description: string };

const authHeader = (token: string) => ({ Authorization: `Bearer ${token}` });

const getPosts = async (token: string): Promise<Post[]> => {
  const res = await fetch("/api/posts", {
    headers: authHeader(token),
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message ?? "Failed to load posts");
  }
  return res.json() as Promise<Post[]>;
};

const createPost = async (token: string, data: CreatePostData): Promise<Post> => {
  const res = await fetch("/api/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeader(token) },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const body = await res.json();
    throw new Error(body.message ?? "Failed to create post");
  }
  return res.json() as Promise<Post>;
};

const deletePost = async (token: string, id: string): Promise<Post> => {
  const res = await fetch(`/api/posts/${id}`, {
    method: "DELETE",
    headers: authHeader(token),
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message ?? "Failed to delete post");
  }
  return res.json() as Promise<Post>;
};

export const postService = { getPosts, createPost, deletePost };
