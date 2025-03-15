import express from "express";
import { Apollo } from "apollo";
import { createServer } from "http";
import { Bootstrap } from "bootstrap";

import { ExpressConfig } from "@Configs/ExpressConfig";

const app = express();
const server = createServer(app);

const apollo = new Apollo(server);
await apollo.start();

const bootstrap = new Bootstrap(app);
bootstrap.addMiddlewares();
bootstrap.addRouters();
bootstrap.addExceptionHandler();
bootstrap.addApollo(apollo.instance);

await new Promise<void>((resolve) => server.listen({ port: ExpressConfig.EXPRESS_PORT }, resolve));
console.log(`🚀 Server ready at http://localhost:${ExpressConfig.EXPRESS_PORT}/graphql`);