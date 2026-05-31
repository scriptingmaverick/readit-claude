import { Schema, model, Document, Types } from "mongoose";

export interface IPost extends Document {
  userId: Types.ObjectId;
  title: string;
  description: string;
  createdAt: Date;
}

const postSchema = new Schema<IPost>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Post = model<IPost>("Post", postSchema);
