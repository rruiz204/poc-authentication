import http from "http";
import { ApolloServer } from "@apollo/server";
import type { ApolloServerPlugin } from "@apollo/server";

import { ApolloServerPlugingLogging } from "@Plugins/ApolloServerPluginLogging";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";

import { BookGraphQL } from "@Graphql/BookGraphQL";
import { BookResolver } from "@Resolvers/BookResolver";

export class Apollo {
  private plugins: ApolloServerPlugin[] = [];

  constructor(private server: http.Server) {
    this.addPlugin(ApolloServerPlugingLogging);
    this.addPlugin(ApolloServerPluginDrainHttpServer({ httpServer: server }));
  };

  public instance: ApolloServer = new ApolloServer({
    typeDefs: [BookGraphQL],
    resolvers: [BookResolver],
    plugins: this.plugins,
  });

  private addPlugin(plugin: ApolloServerPlugin): void {
    this.plugins.push(plugin);
  };

  public async start(): Promise<void> {
    await this.instance.start();
  };
};