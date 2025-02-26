import winston from "winston";
import type { ILoggerOptions } from "./ILoggerOptions";

export const RestLoggerOpts: ILoggerOptions = {
  file: new winston.transports.File({
    filename: "logs/rest.log"
  }),
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    
    winston.format.printf(({ level, message, timestamp }) => {
      return `[${timestamp}] [${level}]: ${message}`;
    }),
  ),
};