import { gql } from 'apollo-server-express';

const typeDefs = gql`
  scalar Date  # custom scalar for Date

  type User {
    _id: ID!
    name: String!
    email: String!
    role: String!
  }

  type Book {
    _id: ID!
    title: String!
    author: String!
    ISBN: String!
    publicationDate: Date
    genre: String
    price: Int
    copies: Int
  }

  type Borrow {
    _id: ID!
    user: User!
    book: Book!
    borrowedAt: Date!
    dueAt: Date!
    returnedAt: Date
    status: String!
  }

  type BookAvailabilityReport {
    totalBooks: Int!
    totalCopies: Int!
    borrowedBooks: Int!
    availableBooks: Int!
  }

  type Query {
    users: [User!]!
    books(search: String, genre: String, author: String, sort: String, page: Int, pageSize: Int): [Book!]!
    borrows(userId: ID): [Borrow!]!
    mostBorrowedBooks(limit: Int): [Book!]!
    activeMembers(limit: Int): [User!]!
    bookAvailability: BookAvailabilityReport!
  }

  type Mutation {
    register(name: String!, email: String!, password: String!): User!
    login(email: String!, password: String!): String! # JWT token
    addBook(
      title: String!
      author: String!
      ISBN: String!
      publicationDate: Date
      genre: String
      price: Int
      copies: Int
    ): Book!
    updateBook(
      id: ID!
      title: String
      author: String
      ISBN: String
      publicationDate: Date
      genre: String
      price: Int
      copies: Int
    ): Book!
    deleteBook(id: ID!): Boolean!
    borrowBook(bookId: ID!, dueAt: Date!): Borrow!
    returnBook(borrowId: ID!): Borrow!
  }
`;

export default typeDefs;
