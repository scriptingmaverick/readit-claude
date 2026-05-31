import { Router } from "express";
import { createPost, deletePost, getPosts } from "../controllers/postController";

const router = Router();

router.get("/", getPosts);
router.post("/", createPost);
router.delete("/:id", deletePost);

export default router;
