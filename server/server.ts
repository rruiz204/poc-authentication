import http from "http";
import express from "express";
import { json } from "body-parser";

import { BookGraphQL } from "./src/Graphql/BookGraphQL";
import { BookResolver } from "./src/Resolvers/BookResolver";

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";

const app = express();
const server = http.createServer(app);

const apollo = new ApolloServer({
  typeDefs: [BookGraphQL],
  resolvers: [BookResolver],
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer: server })],
});

await apollo.start();

app.use(json());
app.use("/graphql", expressMiddleware(apollo));

await new Promise<void>((resolve) => server.listen({ port: 3000 }, resolve));
console.log(`🚀 Server ready at http://localhost:3000/graphql`);