import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./styles.css";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { LoginPage } from "./pages/LoginPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { PostForm } from "./components/PostForm";
import { Feed } from "./components/Feed";

const FeedPage = () => {
  const { user, logout } = useAuth();
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="app-shell">
      <div className="app-header">
        <h1>Readit Claude</h1>
        <div className="app-header__user">
          <span className="app-header__username">{user?.username}</span>
          <button className="app-header__logout-btn" onClick={logout}>
            Log out
          </button>
        </div>
      </div>
      <PostForm onPostCreated={() => setRefreshKey((k) => k + 1)} />
      <Feed refreshKey={refreshKey} />
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/feed"
            element={
              <ProtectedRoute>
                <FeedPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/feed" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
