import { useState, FormEvent } from "react";
import { useAuth } from "../context/AuthContext";
import { postService } from "../services/postService";

type Props = {
  onPostCreated: () => void;
};

export const PostForm = ({ onPostCreated }: Props) => {
  const { token } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setError("");
    setSubmitting(true);
    try {
      await postService.createPost(token, { title, description });
      setTitle("");
      setDescription("");
      onPostCreated();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <h2>Create a Post</h2>
      <input
        className="post-form__input"
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        className="post-form__textarea"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      {error && <p className="post-form__error">{error}</p>}
      <button className="post-form__btn" type="submit" disabled={submitting}>
        {submitting ? "Posting…" : "Post"}
      </button>
    </form>
  );
};
