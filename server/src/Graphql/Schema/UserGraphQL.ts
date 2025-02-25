const UserType = `#graphql
  type User {
    id: ID!
    name: String!
    email: String!
    active: Boolean!
  }
`;

const UserQueries = `#graphql
  type Query {
    listUsers(page: Int!, limit: Int!): [User!]!
  }
`;

export const UserGraphQL = `#graphql
  ${UserType}
  ${UserQueries}
`;