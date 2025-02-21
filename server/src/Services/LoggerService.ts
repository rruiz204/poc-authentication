import winston from "winston";

const console = new winston.transports.Console();

const file = new winston.transports.File({
  filename: "logs/graphql.log"
});

const format = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),

  winston.format.printf(({ level, message, timestamp }) => {
    return `[${timestamp}] [${level}]: ${message}`;
  }),
);

export const LoggerService = winston.createLogger({
  level: "info",
  format: format,
  transports: [file, console]
});