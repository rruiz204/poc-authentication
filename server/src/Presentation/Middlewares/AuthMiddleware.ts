import { JwtService } from "@Services/Tokens/JwtService";
import { HttpException } from "@Exceptions/HttpException";
import type { Request, Response, NextFunction } from "express";

export const AuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) throw new HttpException.Unauthorized("Invalid token");

  try {
    req.user = await JwtService.verify(token);
    next();
  } catch {
    throw new HttpException.Unauthorized("Bad token");
  };
};