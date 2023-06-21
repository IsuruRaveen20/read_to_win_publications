const express = require('express');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

// Middleware
app.use(express.json());

// Test the database connection
const mysql = require('mysql2');

// Create a MySQL connection
const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DB,
});

// Connect to the database
connection.connect((error) => {
  if (error) {
    console.error('Unable to connect to the database:', error);
  } else {
    console.log('Database connection has been established successfully.');

    // Start the server
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  }
});

// Handle database connection errors
connection.on('error', (err) => {
  console.error('Database connection error:', err);
  process.exit(1); // Exit the application if there's a database connection error
});

// Gracefully handle process termination
process.on('SIGINT', () => {
  connection.end(); // Close the database connection when the application is terminated
  process.exit(); // Terminate the application
});



