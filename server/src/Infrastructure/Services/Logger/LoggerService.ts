import winston from "winston";

export class LoggerService {
  private format: winston.Logform.Format;
  private file!: winston.transports.FileTransportInstance;
  private console!: winston.transports.ConsoleTransportInstance;

  constructor() {
    this.format = winston.format.combine(
      winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),

      winston.format.printf(({ level, message, timestamp }) => {
        return `[${timestamp}] [${level}]: ${message}`;
      }),
    );
  };

  public setConsole(): this {
    this.console = new winston.transports.Console();
    return this;
  };

  public setFilePath(filename: string): this {
    this.file = new winston.transports.File({ filename });
    return this;
  };

  public getLogger(): winston.Logger {
    return winston.createLogger({
      level: "info",
      format: this.format,
      transports: [this.console, this.file],
    });
  };
};