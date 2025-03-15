import { LoggerService } from "@Services/LoggerService";
import type { ApolloServerPlugin } from "@apollo/server";

export const ApolloServerPlugingLogging: ApolloServerPlugin = {
  async requestDidStart({ request }) {
    if (request.query?.includes("IntrospectionQuery")) return;
    
    const logger = new LoggerService("logs/graphql.log").getLogger();;
    logger.info(`Incoming request: ${request.query}`);
  },
};