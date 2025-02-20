const BookType = `#graphql
  type Book {
    title: String
    author: String
  }
`;

const BookQueries = `#graphql
  type Query {
    listBooks: [Book]
  }
`;

export const BookGraphQL = `#graphql
  ${BookType}
  ${BookQueries}
`;