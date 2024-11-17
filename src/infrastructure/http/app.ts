import express from "express";
import authRoutes from "@/presentation/routes/auth/routes";
import { ExceptionHandler } from "@/presentation/middlewares/ExceptionHandler";

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);

app.use(ExceptionHandler);

export { app };
