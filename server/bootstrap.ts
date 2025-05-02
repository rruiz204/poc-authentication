import cors from "cors";
import { json } from "body-parser";
import type { Express } from "express";

import { PingRouter } from "@Routers/PingRouter";
import { ExceptionMiddleware } from "@Middlewares/ExceptionMiddleware";

export class Bootstrap {
  constructor(private app: Express) {};

  public addRouters(): void {
    this.app.use("/api/ping", PingRouter);
  };

  public addMiddlewares(): void {
    this.app.use(json());
  };

  public addCors(): void {
    this.app.use(cors());
  };

  public addExceptionHandler(): void {
    this.app.use(ExceptionMiddleware);
  };
};