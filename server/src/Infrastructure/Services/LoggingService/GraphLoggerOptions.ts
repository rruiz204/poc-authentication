import winston from "winston";
import type { LoggerOptions } from "./LoggerOptions";

export const GraphLoggerOptions: LoggerOptions = {
  file: new winston.transports.File({
    filename: "logs/graphql.log"
  }),
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    
    winston.format.printf(({ level, message, timestamp }) => {
      return `[${timestamp}] [${level}]: ${message}`;
    }),
  ),
};