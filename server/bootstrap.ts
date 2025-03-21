import cors from "cors";
import { json } from "body-parser";
import { ApolloServer } from "@apollo/server";

import { PingRouter } from "@Routers/PingRouter";
import { AuthRouter } from "@Routers/AuthRouter";

import { expressMiddleware } from "@apollo/server/express4";
import { LoggerMiddleware } from "@Middlewares/LoggingMiddleware";
import { ExceptionMiddleware } from "@Middlewares/ExceptionMiddleware";

import { GraphQLContextFactory } from "@Graphql/Core/GraphQLContextFactory";

import type { Express } from "express";
import type { GraphQLContext } from "@Graphql/Core/GraphQLContext";

export class Bootstrap {
  constructor(private app: Express) {};

  public addRouters(): void {
    this.app.use("/api/auth", AuthRouter);
    this.app.use("/api/ping", PingRouter);
  };

  public addLogging(): void {
    this.app.use(LoggerMiddleware);
  };

  public addMiddlewares(): void {
    this.app.use(cors());
    this.app.use(json());
  };

  public addExceptionHandler(): void {
    this.app.use(ExceptionMiddleware);
  };

  public addApollo(apollo: ApolloServer<GraphQLContext>): void {
    this.app.use("/graphql", expressMiddleware(apollo, {
      context: async ({ req }): Promise<GraphQLContext> => {
        return await GraphQLContextFactory.build(req);
      }
    }));
  };
};