import express from "express";
import { Apollo } from "apollo";
import { createServer } from "http";
import { Bootstrap } from "bootstrap";

const app = express();
const server = createServer(app);

const apollo = new Apollo(server);
await apollo.start();

const bootstrap = new Bootstrap(app);
bootstrap.addMiddlewares();
bootstrap.addRouters();
bootstrap.addExceptionHandler();
bootstrap.addApollo(apollo.instance);

await new Promise<void>((resolve) => server.listen({ port: 3000 }, resolve));
console.log(`🚀 Server ready at http://localhost:3000/graphql`);