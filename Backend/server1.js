import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import typeDefs from './graphql/Schemas/schema.js';
import resolvers from './graphql/Resolvers/resolvers.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

dotenv.config();
const app = express();

connectDB();

const getUserFromToken = (token) => {
  try {
    if (!token) return null;
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'replace_this');
    console.log('Decoded user from token:', decoded); 
    return decoded;
  } catch (err) {
    console.log('JWT error:', err);
    return null;
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization?.replace('Bearer ', '');
    const user = getUserFromToken(token);
    console.log('User in context:', user); // debug
    return { user };
  },
});

await server.start();
server.applyMiddleware({ app, path: '/graphql' });

app.listen(8000, () => {
  console.log('Server running at http://localhost:8000');
  console.log('GraphQL endpoint at /graphql');
});
