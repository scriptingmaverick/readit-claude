import { RequestHandler } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User";

type AuthedRequest = Express.Request & { user?: { id: string; username: string } };

export const login: RequestHandler = async (req, res) => {
  const { username, password } = req.body as { username?: string; password?: string };
  if (!username || !password) {
    res.status(400).json({ message: "username and password are required" });
    return;
  }

  const existing = await User.findOne({ username });

  let userId: string;
  let storedUsername: string;

  if (existing) {
    const valid = await bcrypt.compare(password, existing.password);
    if (!valid) {
      res.status(401).json({ message: "Invalid username or password." });
      return;
    }
    userId = existing._id.toString();
    storedUsername = existing.username;
  } else {
    const hashed = await bcrypt.hash(password, 10);
    const created = await User.create({ username, password: hashed });
    userId = created._id.toString();
    storedUsername = created.username;
  }

  const token = jwt.sign(
    { id: userId, username: storedUsername },
    process.env.JWT_SECRET as string,
    { expiresIn: "7d" }
  );

  res.status(200).json({ token, user: { id: userId, username: storedUsername } });
};

export const logout: RequestHandler = (_req, res) => {
  res.status(200).json({ message: "Logged out" });
};

export const me: RequestHandler = (req, res) => {
  const user = (req as unknown as AuthedRequest).user;
  res.status(200).json(user);
};
