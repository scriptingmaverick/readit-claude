import { RequestHandler } from "express";
import { Post } from "../models/Post";

export const createPost: RequestHandler = async (req, res) => {
  const { title, description } = req.body as { title?: string; description?: string };
  if (!title || !description) {
    res.status(400).json({ message: "title and description are required" });
    return;
  }
  const post = await Post.create({ title, description });
  res.status(201).json(post);
};

export const getPosts: RequestHandler = async (_req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  res.json(posts);
};

export const deletePost: RequestHandler = async (req, res) => {
  const deleted = await Post.findByIdAndDelete(req.params.id);
  if (!deleted) {
    const err = Object.assign(new Error("Post not found"), { status: 404 });
    throw err;
  }
  res.json(deleted);
};
