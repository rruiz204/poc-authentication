const UserType = `#graphql
  type User {
    id: ID!
    name: String!
    email: String!
    active: Boolean!
  }
`;

const UserInputs = `#graphql
  input ListUsersInput {
    page: Int!
    limit: Int!
    name: String
  }
`;

const UserQueries = `#graphql
  type Query {
    listUsers(input: ListUsersInput!): [User!]!
  }
`;

export const UserGraphQL = `#graphql
  ${UserType}
  ${UserInputs}
  ${UserQueries}
`;