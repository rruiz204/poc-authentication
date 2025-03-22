import type { Request, Response, NextFunction } from "express";

export const ExceptionMiddleware = async (err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
};