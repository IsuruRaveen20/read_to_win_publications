const express = require('express');
require('dotenv').config();
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routers
const authorRouter = require('./routes/authorRoutes');
const bookRouter = require('./routes/bookRoutes');
const categoryRouter = require('./routes/categoryRoutes');


// API Endpoints
app.use('/api/authors', authorRouter);
app.use('/api/books', bookRouter);
app.use('/api/categories', categoryRouter);


// Port
const PORT = process.env.PORT || 4000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


