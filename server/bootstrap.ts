import { json } from "body-parser";
import type { Express } from "express";
import { ApolloServer } from "@apollo/server";
import { AuthRouter } from "@Routers/AuthRouter";
import { expressMiddleware } from "@apollo/server/express4";

export class Bootstrap {
  constructor(private app: Express) {};

  public addRouters(): void {
    this.app.use("/api/auth", AuthRouter);
  };

  public addMiddlewares(): void {
    this.app.use(json());
  };

  public addApollo(apollo: ApolloServer): void {
    this.app.use("/graphql", expressMiddleware(apollo));
  };
};