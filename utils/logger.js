const winston = require('winston');

// Create a Winston logger instance
const logger = winston.createLogger({
  level: 'info', // Set the log level as per your preference
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs.log' })
  ]
});

module.exports = logger;
