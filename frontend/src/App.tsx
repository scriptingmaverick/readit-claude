import { useState } from "react";
import "./styles.css";
import { PostForm } from "./components/PostForm";
import { Feed } from "./components/Feed";

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="app-shell">
      <h1>Readit Claude</h1>
      <PostForm onPostCreated={() => setRefreshKey((k) => k + 1)} />
      <Feed refreshKey={refreshKey} />
    </div>
  );
}

export default App;
