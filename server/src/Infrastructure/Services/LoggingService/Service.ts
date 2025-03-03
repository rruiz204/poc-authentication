import winston from "winston";
import type { LoggerOptions } from "./LoggerOptions";

export class LoggerService {
  private static console = new winston.transports.Console();

  public static getLogger(options: LoggerOptions): winston.Logger {
    return winston.createLogger({
      level: "info",
      format: options.format,
      transports: [this.console, options.file],
    });
  };
};