/**
 * Express Router Configuration:
 * - The 'express.Router()' method is used to create a new router object.
 * - This router object allows defining routes for the '/books' path.
 * - It can be used to handle all the book-related routes.
 */
const express = require('express');

// Import the Book Controller
const bookController = require('../controllers/bookController');

// Create a router instance
const router = express.Router();

// Routes for Books
/**
 * Route: POST /addBook
 * Description: Adds a new book.
 * Controller Method: addBook
 */
router.post('/addBook', bookController.addBook); // Route to add a book

/**
 * Route: GET /allBooks
 * Description: Retrieves all books.
 * Controller Method: getAllBooks
 */
router.get('/allBooks', bookController.getAllBooks); // Route to get all books

/**
 * Route: GET /books/:isbnNo
 * Description: Retrieves a book by ISBN number.
 * Controller Method: getBookByISBN
 * Request Params:
 *   - isbnNo: The ISBN number of the book to search.
 */
router.get('/search/:isbnNo', bookController.searchBookByISBN);



/**
 * Route: POST /bookId/:like
 * Description: Like a book.
 * Controller Method: likeBook
 */
router.post("/:bookId/like", bookController.likeBook);
module.exports = router;








