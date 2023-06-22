const db = require("../models");
const logger = require('../utils/logger');

const Author = db.Author; 

// Register Author
const addAuthor = async (req, res) => {
  try {
    let info = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      contactNo: req.body.contactNo,
    };

    const author = await Author.create(info);
    res.status(200).send(author);
    logger.info('Author created', { authorId: author.id, firstName: author.firstName });

  } catch (error) {
    // Handle validation errors
    if (error.name === "SequelizeValidationError") {
      const errors = error.errors.map((err) => err.message);
      res.status(400).send({ error: "Validation error", details: errors });
    } else {
      logger.error('Failed to register author', { error: error.message });
      res.status(500).send({ error: "Internal server error" });
    }
  }
};


// Get all Authors
const getAllAuthors = async (req, res) => {
  try {
    logger.info('Fetching all authors');
    let authors = await Author.findAll({});
    res.status(200).send(authors);
    logger.info('Authors fetched successfully');
  } catch (error) {
    logger.error('Failed to fetch authors', { error: error.message });
    res.status(500).send({ error: "Internal server error" });
  }
};

module.exports = {
  addAuthor, // Register Author endpoint
  getAllAuthors, // Get all Authors endpoint
};
