import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import { requireAuth } from "./middleware/auth";
import { authRouter } from "./routes/auth";
import { dashboardRouter } from "./routes/dashboard";
import { modulesRouter } from "./routes/modules";

dotenv.config();

export const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL ?? "http://127.0.0.1:3000",
  }),
);
app.use(express.json());
app.use(morgan("dev"));

app.get("/health", (_request, response) => {
  response.json({ ok: true });
});

app.use("/api/auth", authRouter);
app.use("/api/dashboard", requireAuth, dashboardRouter);
app.use("/api/modules", requireAuth, modulesRouter);
