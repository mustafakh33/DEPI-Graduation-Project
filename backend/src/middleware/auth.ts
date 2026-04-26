import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../lib/jwt";

declare module "express-serve-static-core" {
  interface Request {
    user?: {
      id: string;
      email: string;
      role: string;
      name: string;
    };
  }
}

export function requireAuth(request: Request, response: Response, next: NextFunction) {
  const header = request.headers.authorization;
  const token = header?.startsWith("Bearer ") ? header.replace("Bearer ", "") : null;

  if (!token) {
    return response.status(401).json({ message: "Unauthorized" });
  }

  try {
    request.user = verifyToken(token);
    next();
  } catch (error) {
    return response.status(401).json({ message: "Invalid token" });
  }
}
