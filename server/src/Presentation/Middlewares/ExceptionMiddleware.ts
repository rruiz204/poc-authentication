import { BaseException } from "@Exceptions/BaseException";
import type { Request, Response, NextFunction } from "express";

export const ExceptionMiddleware = async (err: BaseException, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status).json({ message: err.message });
};