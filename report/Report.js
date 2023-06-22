const cron = require('node-cron');
const logger = require('../utils/logger');
const Author = require('../models/Author');
const { log } = require('winston');

const generateReport = async () => {
  try {
    // Retrieve all authors
    const authors = await Author.findAll({});
    console.log(authors)
    // Generate the report or log entry
    const report = authors.map(author => ({
      authorId: author.id,
      authorName: `${author.firstName} ${author.lastName}`,
      likeCount: author.likeCount
    }));

    // Output the report or log entry
    logger.info('Like Count Report', { report });

  } catch (error) {
    logger.error('Failed to generate Like Count Report', { error: error.message });
  }
};

// Define the cron schedule (runs every 5 minutes)
cron.schedule('*/5 * * * *', generateReport);

module.exports = generateReport;
