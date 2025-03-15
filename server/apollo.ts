import http from "http";
import { ApolloServer } from "@apollo/server";
import type { ApolloServerPlugin } from "@apollo/server";
import type { GraphQLContext } from "@Graphql/Core/GraphQLContext";

import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";

import { UserGraphQL } from "@Graphql/Schema/UserGraphQL";
import { UserResolver } from "@Graphql/Resolvers/UserResolver";

export class Apollo {
  private plugins: ApolloServerPlugin[] = [];

  public instance = new ApolloServer<GraphQLContext>({
    typeDefs: [UserGraphQL],
    resolvers: [UserResolver],
    plugins: this.plugins,
  });

  constructor(private server: http.Server) {
    this.addPlugin(ApolloServerPluginDrainHttpServer({ httpServer: server }));
  };

  private addPlugin(plugin: ApolloServerPlugin): void {
    this.plugins.push(plugin);
  };

  public async start(): Promise<void> {
    await this.instance.start();
  };
};