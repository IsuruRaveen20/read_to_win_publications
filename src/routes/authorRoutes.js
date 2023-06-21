const express = require('express');
const route = express.Router();
const authorController = require("../controllers/authorController");

//Routes for authors
Router.get('/', authorController, getAllAuthors);
Router.post('/', authorController, createAuthor);

module.exports = Router;