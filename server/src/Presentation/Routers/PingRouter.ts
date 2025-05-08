import { Router } from "express";
import type { Request, Response } from "express";
import { AuthMiddleware } from "@Middlewares/AuthMiddleware";

export const PingRouter = Router();

PingRouter.use(AuthMiddleware);

PingRouter.get("/", (req: Request, res: Response) => {
  res.status(200).json({ ping: "pong" });
});