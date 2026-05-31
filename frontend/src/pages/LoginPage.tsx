import { FormEvent, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const LoginPage = () => {
  const { isAuthenticated, login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (isAuthenticated) return <Navigate to="/feed" replace />;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await login(username, password);
    } catch (err) {
      const status = (err as { status?: number }).status;
      setError(
        status === 401
          ? "Invalid username or password."
          : "Unable to log in. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="login-page">
      <h1>Readit Claude</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Log in / Sign up</h2>
        <input
          className="login-form__input"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          className="login-form__input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="login-form__error">{error}</p>}
        <button className="login-form__btn" type="submit" disabled={submitting}>
          {submitting ? "Please wait…" : "Log in / Sign up"}
        </button>
      </form>
    </div>
  );
};
