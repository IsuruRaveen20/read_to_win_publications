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
    logger.info('Book created', { bookId: book.id });

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


module.exports = {
  addBook, // Register a Book endpoint
  getAllBooks, // Get all Books endpoint
};
