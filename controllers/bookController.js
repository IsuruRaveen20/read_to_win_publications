const db = require("../models");
const logger = require('../utils/logger');

const Book = db.Book;
const Author = db.Author;

// Register a Book
const addBook = async (req, res) => {
  try {
    let info = {
      isbnNo: req.body.isbnNo,
      category: req.body.category,
      title: req.body.title,
    };

    const book = await Book.create(info);
    await book.setAuthor(req.body.bookId); // Associate the book with the author
    res.status(200).send(book);

    logger.info(`Book created: ${book.title}`, { bookId: book.id, bookTitle: book.title });
  } catch (error) {
    // Handle validation errors
    if (error.name === "SequelizeValidationError") {
      const errors = error.errors.map((err) => err.message);
      res.status(400).send({ error: "Validation error", details: errors });
    } else {
      logger.error('Failed to register book', { error: error.message });
      res.status(500).send({ error: "Internal server error" });
    }
  }
};


// Display All Books
const getAllBooks = async (req, res) => {
  try {
    logger.info('Fetching all books');
    let books = await Book.findAll({
      include: [Author], // Include the associated Author model
    });
    res.status(200).send(books);
    logger.info('Books fetched successfully');
  } catch (error) {
    logger.error('Failed to fetch books', { error: error.message });
    res.status(500).send({ error: "Internal Server error" });
  }
};

const searchBookByISBN = async (req, res) => {
  const isbnNo = req.params.isbnNo;
  try {
    const book = await Book.findOne({
      where: { isbnNo: isbnNo },
      include: [Author], // Include the associated Author model
    });

    if (book) {
      res.status(200).send(book);
      logger.info('Book found by ISBN', { isbnNo: isbnNo });
    } else {
      res.status(404).send({ error: "Book not found" });
      logger.warn('Book not found by ISBN', { isbnNo: isbnNo });
    }
  } catch (error) {
    res.status(500).send({ error: "Internal Server error" });
    logger.error(`Error searching book by ISBN`, { isbnNo: isbnNo, error: error.message });
  }
};

// Like a book
const likeBook = async (req, res) => {
  const bookId = req.params.bookId;

  try {
    const book = await Book.findByPk(bookId);
    if (!book) {
      res.status(404).send({ error: "Book not found" });
      return;
    }

    const previousLikeCount = book.likeCount;
    book.likeCount += 1;
    await book.save();

    logger.info(`Book liked: ${book.title}`, {
      bookId: book.id,
      previousLikeCount,
      currentLikeCount: book.likeCount,
    });

    res.status(200).send({ message: "Book liked successfully" });
  } catch (error) {
    logger.error("Failed to like book", { error: error.message });
    res.status(500).send({ error: "Internal server error" });
  }
};

module.exports = {
  addBook, // Register a Book endpoint
  getAllBooks, // Get all Books endpoint
  searchBookByISBN, //Search Books by ISBN endpoint
  likeBook,
};
