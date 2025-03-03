import type { ApolloServerPlugin } from "@apollo/server";
import { LoggerService } from "@Services/LoggingService/Service";
import { GraphLoggerOptions } from "@Services/LoggingService/GraphLoggerOptions";

export const ApolloServerPlugingLogging: ApolloServerPlugin = {
  async requestDidStart({ request }) {
    if (request.query?.includes("IntrospectionQuery")) return;
    const logger = LoggerService.getLogger(GraphLoggerOptions);
    logger.info(`Incoming request: ${request.query}`);
  },
};