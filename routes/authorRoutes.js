/**
 * Express Router Configuration:
 * - The 'express.Router()' method is used to create a new router object.
 * - This router object allows defining routes for the '/authors' path.
 * - It can be used to handle all the author-related routes.
 */
const express = require('express');

// Import the Author Controller
const authorController = require('../controllers/authorController');

// Create a router instance
const router = express.Router();

// Routes for authors
/**
 * Route: POST /addAuthor
 * Description: Adds a new author.
 * Controller Method: addAuthor
 */
router.post('/addAuthor', authorController.addAuthor); // Route to add an author

/**
 * Route: GET /allAuthors
 * Description: Retrieves all authors.
 * Controller Method: getAllAuthors
 */
router.get('/allAuthors', authorController.getAllAuthors); // Route to get all authors

module.exports = router;





