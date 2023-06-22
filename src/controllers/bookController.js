const db = require("../models");

const Book = db.Book; // Updated model name
const Author = db.Author; // Updated model name

// Register a Book
const addBook = async (req, res) => {
  try {
    let info = {
      isbnNo: req.body.isbnNo,
      category: req.body.category,
      title: req.body.title,
    };

    const book = await Book.create(info);
    await book.setAuthor(req.body.authorId); // Associate the book with the author
    res.status(200).send(book);
    console.log(book);
  } catch (error) {
    // Handle validation errors
    if (error.name === "SequelizeValidationError") {
      const errors = error.errors.map((err) => err.message);
      res.status(400).send({ error: "Validation error", details: errors });
    } else {
      res.status(500).send({ error: "Internal server error" });
    }
  }
};

// Display All Books
const getAllBooks = async (req, res) => {
  try {
    let books = await Book.findAll({
      include: [Author], // Include the associated Author model
    });
    res.status(200).send(books);
  } catch (error) {
    res.status(500).send({ error: "Internal Server error" });
  }
};

module.exports = {
  addBook,
  getAllBooks,
};

