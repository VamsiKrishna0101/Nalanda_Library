import { Book } from '../models/Book.js';
import { Borrow } from '../models/Borrow.js';
import { User } from '../models/User.js';
export const mostBorrowedBooks = async (req, res, next) => {
  try {
    const books = await Borrow.aggregate([
      { $group: { _id: '$book', borrowCount: { $sum: 1 } } },
      { $sort: { borrowCount: -1 } },
      { $limit: 10 },
      {
        $lookup: {
          from: 'books',
          localField: '_id',
          foreignField: '_id',
          as: 'bookDetails'
        }
      },
      { $unwind: '$bookDetails' },
      {
        $project: {
          _id: 0,
          bookId: '$_id',
          title: '$bookDetails.title',
          author: '$bookDetails.author',
          borrowCount: 1,
        }
      }
    ]);
    res.json({ books });
  } catch (err) {
    next(err);
  }
};

export const activeMembers = async (req, res, next) => {
  try {
    const members = await Borrow.aggregate([
      { $group: { _id: '$user', borrowCount: { $sum: 1 } } },
      { $sort: { borrowCount: -1 } },
      { $limit: 10 },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'userDetails'
        }
      },
      { $unwind: '$userDetails' },
      {
        $project: {
          _id: 0,
          userId: '$_id',
          name: '$userDetails.name',
          email: '$userDetails.email',
          borrowCount: 1
        }
      }
    ]);
    res.json({ members });
  } catch (err) {
    next(err);
  }
};

export const bookAvailability = async (req, res, next) => {
  try {
    const totalBooks = await Book.countDocuments();
    const totalCopies = await Book.aggregate([
      { $group: { _id: null, copies: { $sum: '$copies' } } }
    ]);
    const borrowed = await Borrow.aggregate([
      { $match: { returnedAt: { $exists: false } } },
      { $group: { _id: '$book', borrows: { $sum: 1 } } }
    ]);
    const borrowedBooksCount = borrowed.length;

    res.json({
      totalBooks,
      totalCopies: totalCopies[0]?.copies || 0,
      borrowedBooks: borrowedBooksCount,
      availableBooks: totalBooks - borrowedBooksCount
    });
  } catch (err) {
    next(err);
  }
};
