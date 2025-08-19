import { GraphQLScalarType, Kind } from 'graphql';
import { User } from '../../models/User.js';
import { Book } from '../../models/Book.js';
import { Borrow } from '../../models/Borrow.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'replace_this';

const resolvers = {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) { return new Date(value); },
    serialize(value) { return value instanceof Date ? value.toISOString() : null; },
    parseLiteral(ast) { return ast.kind === Kind.STRING ? new Date(ast.value) : null; },
  }),

  Query: {
    users: async (parent, args, context) => {
      if (!context.user?.role || context.user.role.toLowerCase() !== 'admin') {
        throw new Error(`Not authorized. Your role: ${context.user?.role || 'undefined'}`);
      }
      return User.find();
    },

    books: async (parent, { search, genre, author, sort, page = 1, pageSize = 12 }) => {
      let query = {};
      if (genre) query.genre = genre;
      if (author) query.author = author;
      if (search) query.title = { $regex: search, $options: 'i' };
      let books = await Book.find(query);
      if (sort === 'price') books.sort((a, b) => a.price - b.price);
      const start = (page - 1) * pageSize;
      return books.slice(start, start + pageSize);
    },

    borrows: async (parent, { userId }, context) => {
      const id = userId || context.user?._id;
      return Borrow.find({ user: id }).populate('book').populate('user');
    },

    mostBorrowedBooks: async (parent, { limit = 10 }) => {
      const agg = await Borrow.aggregate([
        { $group: { _id: "$book", borrowCount: { $sum: 1 } } },
        { $sort: { borrowCount: -1 } },
        { $limit: limit }
      ]);
      const bookIds = agg.map(b => b._id);
      return Book.find({ _id: { $in: bookIds } });
    },

    activeMembers: async (parent, { limit = 10 }) => {
      const agg = await Borrow.aggregate([
        { $group: { _id: "$user", borrowCount: { $sum: 1 } } },
        { $sort: { borrowCount: -1 } },
        { $limit: limit }
      ]);
      const userIds = agg.map(b => b._id);
      return User.find({ _id: { $in: userIds } });
    },

    bookAvailability: async () => {
      const totalBooks = await Book.countDocuments();
      const totalCopiesArr = await Book.aggregate([{ $group: { _id: null, copies: { $sum: '$copies' } } }]);
      const totalCopies = totalCopiesArr[0]?.copies || 0;
      const borrowedBooks = await Borrow.countDocuments({ status: "borrowed" });
      return {
        totalBooks,
        totalCopies,
        borrowedBooks,
        availableBooks: totalBooks - borrowedBooks
      };
    }
  },

  Mutation: {
    register: async (parent, { name, email, password }) => {
      const hash = await bcrypt.hash(password, 10);
      const user = new User({ name, email, password: hash, role: 'member' });
      await user.save();
      return user;
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) throw new Error('Invalid credentials');
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) throw new Error('Invalid credentials');
      return jwt.sign({ id: user._id, role: user.role.toLowerCase() }, JWT_SECRET, { expiresIn: '7d' });
    },

    addBook: async (parent, args, context) => {
      if (!context.user?.role || context.user.role.toLowerCase() !== 'admin') {
        throw new Error(`Not authorized to add books. Your role: ${context.user?.role || 'undefined'}`);
      }
      const book = new Book(args);
      await book.save();
      return book;
    },

    updateBook: async (parent, { id, ...updates }, context) => {
      if (!context.user?.role || context.user.role.toLowerCase() !== 'admin') {
        throw new Error(`Not authorized to update books. Your role: ${context.user?.role || 'undefined'}`);
      }
      return Book.findByIdAndUpdate(id, updates, { new: true });
    },

    deleteBook: async (parent, { id }, context) => {
      if (!context.user?.role || context.user.role.toLowerCase() !== 'admin') {
        throw new Error(`Not authorized to delete books. Your role: ${context.user?.role || 'undefined'}`);
      }
      await Book.findByIdAndDelete(id);
      return true;
    },

    borrowBook: async (parent, { bookId, dueAt }, context) => {
      if (!context.user?.role || context.user.role.toLowerCase() !== 'member') {
        throw new Error(`Only members can borrow books. Your role: ${context.user?.role || 'undefined'}`);
      }
      const book = await Book.findById(bookId);
      if (!book || book.copies < 1) throw new Error("No copies available");
      book.copies -= 1;
      await book.save();
      const borrow = new Borrow({
        user: context.user._id,
        book: book._id,
        dueAt,
        status: "borrowed"
      });
      await borrow.save();
      return borrow.populate('user').populate('book');
    },

    returnBook: async (parent, { borrowId }, context) => {
      const borrow = await Borrow.findById(borrowId).populate('book').populate('user');
      if (!borrow) throw new Error("Not found");
      if (borrow.returnedAt) throw new Error("Already returned");
      borrow.returnedAt = new Date();
      borrow.status = "returned";
      await borrow.save();
      await Book.findByIdAndUpdate(borrow.book._id, { $inc: { copies: 1 } });
      return borrow;
    }
  }
};

export default resolvers;
