import "express-async-errors";
import express from "express";
import cors from "cors";
import postsRouter from "./routes/posts";
import authRouter from "./routes/auth";
import { authMiddleware } from "./middleware/auth";
import { errorHandler } from "./utils/errorHandler";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api", (_req, res) => {
  res.json({ message: "Readit Claude backend is running" });
});

app.use("/api/auth", authRouter);
app.use("/api/posts", authMiddleware, postsRouter);

app.use(errorHandler);

export default app;
