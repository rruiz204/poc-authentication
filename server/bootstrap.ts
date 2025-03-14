import { json } from "body-parser";
import { ApolloServer } from "@apollo/server";
import { AuthRouter } from "@Routers/AuthRouter";
import { LoggerService } from "@Services/LoggerService";
import { expressMiddleware } from "@apollo/server/express4";
import { AuthMiddleware } from "@Middlewares/AuthMiddleware";

import type { GraphQLContext } from "@Graphql/GraphQLContext";
import type { Express, Request, Response, NextFunction } from "express";

export class Bootstrap {
  constructor(private app: Express) {};

  public addRouters(): void {
    this.app.use("/api/auth", AuthRouter);
  };

  public addMiddlewares(): void {
    this.app.use(json());
  };

  public addLogging(): void {
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      const logger = new LoggerService("logs/rest.log").getLogger();
      logger.info(`${req.method} ${req.url}`);
      next();
    });
  };

  public addApollo(apollo: ApolloServer<GraphQLContext>): void {
    this.app.use("/graphql", expressMiddleware(apollo, {
      
      context: async ({ req, res }): Promise<GraphQLContext> => {
        const payload = await AuthMiddleware(req);
        return { user: payload.id };
      },
    }));
  };

  public addExceptionHandler(): void {
    this.app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      res.status(500).json({ message: err.message });
    });
  };
};