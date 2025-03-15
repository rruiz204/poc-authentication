import type { Request } from "express";
import type { GraphQLContext } from "./GraphQLContext";
import { AuthMiddleware } from "@Middlewares/AuthMiddleware";

export class GraphQLContextFactory {
  public static async build(req: Request): Promise<GraphQLContext> {
    if (req.body.query.includes("IntrospectionQuery")) return {};

    const payload = await AuthMiddleware(req);
    return {
      user: payload.id,
    };
  };
};