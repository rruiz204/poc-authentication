import http from "http";
import { ApolloServer } from "@apollo/server";
import type { ApolloServerPlugin } from "@apollo/server";
import type { GraphQLContext } from "@Graphql/Core/GraphQLContext";

/* import { UserGraphQL } from "@Graphql/Schema/UserGraphQL";
import { UserResolver } from "@Graphql/Resolvers/UserResolver"; */

import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";

export class Apollo {
  private plugins: ApolloServerPlugin[] = [];

  public instance = new ApolloServer<GraphQLContext>({
    typeDefs: [],
    resolvers: [],
    plugins: [],
  });

  constructor(server: http.Server) {
    this.addPlugin(ApolloServerPluginDrainHttpServer({ httpServer: server }));
  };

  private addPlugin(plugin: ApolloServerPlugin): void {
    this.plugins.push(plugin);
  };

  public async start(): Promise<void> {
    await this.instance.start();
  };
};