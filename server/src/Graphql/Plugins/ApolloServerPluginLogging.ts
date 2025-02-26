import type { ApolloServerPlugin } from "@apollo/server";
import { LoggerService } from "@Services/Logger/LoggerService";
import { GraphLoggerOpts } from "@Services/Logger/GraphLoggerOps";

export const ApolloServerPlugingLogging: ApolloServerPlugin = {
  async requestDidStart({ request }) {
    if (request.query?.includes("IntrospectionQuery")) return;
    const logger = LoggerService.getLogger(GraphLoggerOpts);
    logger.info(`Incoming request: ${request.query}`);
  },
};