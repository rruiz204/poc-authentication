import winston from "winston";

export interface ILoggerOptions {
  format: winston.Logform.Format;
  file: winston.transports.FileTransportInstance;
};