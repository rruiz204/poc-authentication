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
  }

  input UpdateUserInput {
    name: String
    email: String
    active: Boolean
  }
`;

const UserQueries = `#graphql
  type Query {
    getMyUser: User!
    listUsers(input: ListUsersInput!): [User!]!
  }
`;

const UserMutations = `#graphql
  type Mutation {
    updateUser(input: UpdateUserInput!): User!
  }
`;

export const UserGraphQL = `#graphql
  ${UserType}
  ${UserInputs}
  ${UserQueries}
  ${UserMutations}
`;