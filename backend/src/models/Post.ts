import { Schema, model, Document } from "mongoose";

export interface IPost extends Document {
  title: string;
  description: string;
  username: string;
  createdAt: Date;
}

const postSchema = new Schema<IPost>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  username: { type: String, default: "Anonymous" },
  createdAt: { type: Date, default: Date.now },
});

export const Post = model<IPost>("Post", postSchema);
