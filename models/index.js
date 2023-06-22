const dbConfig = require('../config/database');
const { Sequelize, DataTypes } = require('sequelize');
const cron = require('node-cron');
const logger = require('../utils/logger');

// Create a new Sequelize instance with the database configuration
const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle
    }
  }
);

// Authenticate the connection to the database
sequelize
  .authenticate()
  .then(() => {
    console.log('Connected to the database successfully...');
  })
  .catch(err => {
    console.log('Error: ' + err);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import and define the models using sequelize.define()
db.Author = require('./Author')(sequelize, DataTypes);
db.Book = require('./Book')(sequelize, DataTypes);
db.Category = require('./Category')(sequelize, DataTypes);
db.User = require('./User')(sequelize, DataTypes);

// Associations
// Define the associations between the models using the appropriate association methods
db.Author.hasMany(db.Book, { foreignKey: 'authorId' });
db.Book.belongsTo(db.Author, { foreignKey: 'authorId' });
db.Book.belongsToMany(db.Category, { through: 'BookCategory' });
db.Category.belongsToMany(db.Book, { through: 'BookCategory' });
db.Book.belongsToMany(db.User, { through: 'Like' });
db.User.belongsToMany(db.Book, { through: 'Like' });

// Synchronize models with the database
db.sequelize.sync({ force: false })
  .then(() => {
    console.log('Re-sync done!');
  });

// Function to generate the report
const generateReport = async () => {
  try {
    // Retrieve all authors with their associated books
    const authors = await db.Author.findAll({
      include: {
        model: db.Book,
        attributes: ['likeCount']
      }
    });

    // Generate the report or log entry
    const report = authors.map(author => ({
      authorId: author.id,
      authorName: `${author.firstName} ${author.lastName}`,
      likeCount: author.Books.reduce((totalLikes, book) => totalLikes + book.likeCount, 0)
    }));

    // Output the report or log entry
    logger.info('Like Count Report', { report });

    // You can also send the report via email or perform any other actions here

  } catch (error) {
    logger.error('Failed to generate Like Count Report', { error: error.message });
  }
};

// Define the cron schedule (runs every 5 minutes)
cron.schedule('*/5 * * * *', generateReport);

module.exports = {
  db,
  generateReport
};
