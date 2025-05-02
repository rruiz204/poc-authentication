import express from "express";
import { Bootstrap } from "bootstrap";
import { ExpressConfig } from "@Configs/ExpressConfig";

const app = express();

const bootstrap = new Bootstrap(app);

bootstrap.addCors();
bootstrap.addMiddlewares();
bootstrap.addRouters();
bootstrap.addExceptionHandler();

app.listen(ExpressConfig.EXPRESS_PORT, () => {
  console.log(`Server is listening at http://localhost:${ExpressConfig.EXPRESS_PORT}`);
});