import { json } from "body-parser";
import { ApolloServer } from "@apollo/server";
import { AuthRouter } from "@Routers/AuthRouter";
import { expressMiddleware } from "@apollo/server/express4";

import { ExceptionHandlerMiddleware } from "@Middlewares/ExceptionHandlerMiddleware";

import type { Express } from "express";
import type { GraphQLContext } from "@Graphql/Core/GraphQLContext";

export class Bootstrap {
  constructor(private app: Express) {};

  public addRouters(): void {
    this.app.use("/api/auth", AuthRouter);
  };

  public addMiddlewares(): void {
    this.app.use(json());
  };

  public addExceptionHandler(): void {
    this.app.use(ExceptionHandlerMiddleware);
  };

  public addApollo(apollo: ApolloServer<GraphQLContext>): void {
    this.app.use("/graphql", expressMiddleware(apollo, {
      context: async ({ req }): Promise<GraphQLContext> => ({
        token: req.headers.authorization || "",
      }),
    }));
  };
};