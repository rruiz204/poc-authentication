import winston from "winston";
import type { ILoggerOptions } from "./ILoggerOptions";

export class LoggerService {
  private static console = new winston.transports.Console();

  public static getLogger(options: ILoggerOptions): winston.Logger {
    return winston.createLogger({
      level: "info",
      format: options.format,
      transports: [this.console, options.file],
    });
  };
};