import { Router } from "express";
import { z } from "zod";
import { adminUser } from "../data/seed";
import { signToken } from "../lib/jwt";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const authRouter = Router();

authRouter.post("/login", (request, response) => {
  const parsed = loginSchema.safeParse(request.body);

  if (!parsed.success) {
    return response.status(400).json({ message: "Invalid login payload" });
  }

  const { email, password } = parsed.data;
  if (email !== adminUser.email || password !== adminUser.password) {
    return response.status(401).json({ message: "Invalid credentials" });
  }

  const token = signToken({
    id: adminUser.id,
    email: adminUser.email,
    role: adminUser.role,
    name: adminUser.name,
  });

  return response.json({
    token,
    user: {
      id: adminUser.id,
      name: adminUser.name,
      email: adminUser.email,
      role: adminUser.role,
    },
  });
});
