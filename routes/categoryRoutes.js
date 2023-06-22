/**
 * Express Router Configuration:
 * - The 'express.Router()' method is used to create a new router object.
 * - This router object allows defining routes for the '/categories' path.
 * - It can be used to handle all the category-related routes.
 */
const express = require('express');

// Import the Category Controller

const categoryController = require('../controllers/categoryController');

// Create a router instance
const router = express.Router();

// Routes for Categories

/**
 * Route: POST /addCategory
 * Description: Adds a new category.
 * Controller Method: createCategory
 */
router.post('/addCategory', categoryController.addCategory); // Route to add a category

/**
 * Route: GET /allCategories
 * Description: Retrieves all categories.
 * Controller Method: getAllCategories
 */
router.get('/allCategories', categoryController.getAllCategories); // Route to get all categories

module.exports = router;



