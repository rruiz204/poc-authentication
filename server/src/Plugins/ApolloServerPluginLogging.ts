import { LoggerService } from "@Services/LoggerService";
import type { ApolloServerPlugin } from "@apollo/server";

export const ApolloServerPlugingLogging: ApolloServerPlugin = {
  async requestDidStart({ request }) {
    if (request.query?.includes("IntrospectionQuery")) return;
    LoggerService.info(`Incoming request: ${request.query}`);
  },
};