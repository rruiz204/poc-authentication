import http from "http";
import { ApolloServer } from "@apollo/server";
import type { ApolloServerPlugin } from "@apollo/server";
import type { GraphQLContext } from "@Graphql/GraphQLContext";

import { ApolloServerPlugingLogging } from "@Graphql/Plugins/ApolloServerPluginLogging";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";

import { PingGraphQL } from "@Graphql/Schema/PingGraphQL";
import { PingResolver } from "@Graphql/Resolvers/PingResolver";

import { UserGraphQL } from "@Graphql/Schema/UserGraphQL";
import { UserResolver } from "@Graphql/Resolvers/UserResolver";

export class Apollo {
  private plugins: ApolloServerPlugin[] = [];

  constructor(private server: http.Server) {
    this.addPlugin(ApolloServerPlugingLogging);
    this.addPlugin(ApolloServerPluginDrainHttpServer({ httpServer: server }));
  };

  public instance = new ApolloServer<GraphQLContext>({
    typeDefs: [PingGraphQL, UserGraphQL],
    resolvers: [PingResolver, UserResolver],
    plugins: this.plugins,
  });

  private addPlugin(plugin: ApolloServerPlugin): void {
    this.plugins.push(plugin);
  };

  public async start(): Promise<void> {
    await this.instance.start();
  };
};