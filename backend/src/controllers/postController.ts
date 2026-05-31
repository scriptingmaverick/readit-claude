import { RequestHandler } from "express";
import { Post } from "../models/Post";

export const createPost: RequestHandler = async (req, res) => {
  const { title, description } = req.body as { title?: string; description?: string };
  if (!title || !description) {
    res.status(400).json({ message: "title and description are required" });
    return;
  }
  const post = await Post.create({ title, description, userId: req.user!.id });
  res.status(201).json(post);
};

export const getPosts: RequestHandler = async (req, res) => {
  const posts = await Post.find({ userId: req.user!.id }).sort({ createdAt: -1 });
  res.json(posts);
};

export const deletePost: RequestHandler = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    throw Object.assign(new Error("Post not found"), { status: 404 });
  }
  if (post.userId.toString() !== req.user!.id) {
    throw Object.assign(new Error("Forbidden"), { status: 403 });
  }
  await post.deleteOne();
  res.json(post);
};
