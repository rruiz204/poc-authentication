import { Router } from "express";
import type { Request, Response } from "express";

export const PingRouter = Router();

PingRouter.get("/", (req: Request, res: Response) => {
  res.status(200).json({ ping: "pong" });
});