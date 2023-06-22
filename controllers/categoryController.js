const db = require("../models");
const logger = require('../utils/logger');

const Category = db.Category; 

// Register Category
const addCategory = async (req, res) => {
    try {
      let info = {
        name: req.body.name,
        description: req.body.description,
      };
  
      const category = await Category.create(info);
      res.status(200).send(category);
      logger.info('Category created', { categoryId: category.id, name: category.name });
  
    } catch (error) {
      // Handle validation errors
      if (error.name === "SequelizeValidationError") {
        const errors = error.errors.map((err) => err.message);
        res.status(400).send({ error: "Validation error", details: errors });
      } else {
        logger.error('Failed to register Category', { error: error.message });
        res.status(500).send({ error: "Internal server error" });
      }
    }
  };
  

// Get all Categories
const getAllCategories = async (req, res) => {
  try {
    let categories = await Category.findAll({});
    res.status(200).send(categories);
    logger.info('Retrieved all categories');
  } catch (error) {
    logger.error('Failed to retrieve categories', { error: error.message });
    res.status(500).send({ error: "Internal server error" });
  }
};


module.exports = {
    addCategory, // Register Category endpoint
    getAllCategories, // Get all Categories endpoint
};
