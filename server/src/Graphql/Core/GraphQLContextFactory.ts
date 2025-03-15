import type { Request } from "express";
import type { GraphQLContext } from "./GraphQLContext";

import { AuthenticationMiddleware } from "@Middlewares/AuthenticationMiddleware";

export class GraphQLContextFactory {
  public static async build(req: Request): Promise<GraphQLContext> {
    if (req.body.query.includes("IntrospectionQuery")) return {};

    const payload = await AuthenticationMiddleware(req);

    return {
      user: payload.id,
    };
  };
};