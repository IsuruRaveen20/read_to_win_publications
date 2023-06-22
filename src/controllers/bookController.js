const db = require("../models");

const Book = db.books

//Register a Book
const addBook = async (req, res) => {
    try {
        let info = {
            isbnNo: req.body.isbnNo,
            category: req.body.category,
            title: req.body.title,
            authorId: req.body.authorId
        };

        const book = await Book.create(info)
        res.status(200).send(book)
        console.log(book)
    } catch (error) {
        // Handle validation errors
        if (error.name === "SequelizeValidationError") {
          const errors = error.errors.map((err) => err.message);
          res.status(400).send({ error: "Validation error", details: errors })
        } else {
          res.status(500).send({ error: "Internal server error" })
        }
      }
};


//Display All Books 
const getAllBooks = async (req, res) => {
    try {
        let books = await Book.findAll({})
        res.status(200).send(books)
    } catch (error) {
        res.status(500).send({ error: "Internal Server error"})
    }
};

module.exports = {
    addBook,
    getAllBooks
};