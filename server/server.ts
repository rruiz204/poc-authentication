import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { BookGraphQL } from "./src/Graphql/BookGraphQL";
import { BookResolver } from "./src/Resolvers/BookResolver";

const server = new ApolloServer({
  typeDefs: [BookGraphQL],
  resolvers: [BookResolver],
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀 Server ready at: ${url}`);