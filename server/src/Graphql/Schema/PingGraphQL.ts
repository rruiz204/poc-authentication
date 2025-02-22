const PingQueries = `#graphql
  type Query {
    ping: String!
  }
`;

export const PingGraphQL = `#graphql
  ${PingQueries}
`;