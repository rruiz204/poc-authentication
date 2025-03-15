import winston from "winston";

export class LoggerService {
  private format: winston.Logform.Format;
  private file: winston.transports.FileTransportInstance;
  private console: winston.transports.ConsoleTransportInstance;

  constructor(file: string) {
    this.console = new winston.transports.Console();

    this.file = new winston.transports.File({ filename: file });

    this.format = winston.format.combine(
      winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),

      winston.format.printf(({ level, message, timestamp }) => {
        return `[${timestamp}] [${level}]: ${message}`;
      }),
    );
  };

  public getLogger() {
    return winston.createLogger({
      level: "info",
      format: this.format,
      transports: [this.console, this.file],
    });
  };
};