import jwt from "jsonwebtoken";
import { AuthenticatedRequestUser } from "../types";

const secret = process.env.JWT_SECRET ?? "super-secret-admin-lms";

export function signToken(payload: AuthenticatedRequestUser) {
  return jwt.sign(payload, secret, { expiresIn: "8h" });
}

export function verifyToken(token: string) {
  return jwt.verify(token, secret) as AuthenticatedRequestUser;
}
