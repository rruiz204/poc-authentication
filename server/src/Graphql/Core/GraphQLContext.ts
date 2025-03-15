import type { BaseContext } from "@apollo/server";

export interface GraphQLContext extends BaseContext {
  user?: number;
};