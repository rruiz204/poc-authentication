import type { Request, Response, NextFunction } from "express";
import { LoggerService } from "@Services/Logger/LoggerService";

const EXCLUDED_PATHS: string[] = ["/graphql"];

const logger = new LoggerService()
  .setConsole().setFilePath("logs/rest.log").getLogger();

export const LoggerMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  if (!EXCLUDED_PATHS.includes(req.path)) logger.info(`${req.method} ${req.url}`);
  next();
};