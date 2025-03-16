import type { ApolloServerPlugin } from "@apollo/server";
import { LoggerService } from "@Services/Logger/LoggerService";

const logger = new LoggerService()
  .setConsole().setFilePath("logs/graphql.log").getLogger();

export const ApolloServerPluginLogging: ApolloServerPlugin = {
  async requestDidStart({ request }) {
    if (request.query?.includes("IntrospectionQuery")) return;
    logger.info(`Incoming request: ${request.query}`);
  },
};