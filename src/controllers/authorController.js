const db = require("../models");

const Author = db.Author; // Updated model name

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
    console.log(author);
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

// Get all Authors
const getAllAuthors = async (req, res) => {
  try {
    let authors = await Author.findAll({});
    res.status(200).send(authors);
  } catch (error) {
    res.status(500).send({ error: "Internal server error" });
  }
};

module.exports = {
  addAuthor,
  getAllAuthors,
};

// const db = require("../models");

// const Author = db.authors

// // Register Author
// const addAuthor = async (req, res) => {
//   try {
//     let info = {
//       firstName: req.body.firstName,
//       lastName: req.body.lastName,
//       email: req.body.email,
//       contactNo: req.body.contactNo,
//     };

//     const author = await Author.create(info)
//     res.status(200).send(author)
//     console.log(author)
//   } catch (error) {
//     // Handle validation errors
//     if (error.name === "SequelizeValidationError") {
//       const errors = error.errors.map((err) => err.message);
//       res.status(400).send({ error: "Validation error", details: errors })
//     } else {
//       res.status(500).send({ error: "Internal server error" })
//     }
//   }
// };

// // Get all Authors
// const getAllAuthors = async (req, res) => {
//   try {
//     let authors = await Author.findAll({})
//     res.status(200).send(authors)
//   } catch (error) {
//     res.status(500).send({ error: "Internal server error" })
//   }
// };

// module.exports = {
//   addAuthor,
//   getAllAuthors,
// };



