import winston from "winston";

export interface LoggerOptions {
  format: winston.Logform.Format;
  file: winston.transports.FileTransportInstance;
};