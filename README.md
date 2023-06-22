# Read To Win Publications Application

This application is designed to manage authors, books, categories, and user likes in the Read To Win Publications system. It provides functionality for creating, updating, and retrieving information related to authors and books, as well as generating reports on like counts for each author.

## Prerequisites

Before running the application, ensure you have the following installed on your system:

- Node.js (v12 or higher)
- NPM (Node Package Manager)

## Installation

1. Clone the repository:



2. Navigate to the project directory:
   cd read_to_win_publications

3. Install the Dependencies
   npm install

## Database Configuration  
1. Create a new database for the application. You can use a database management tool like phpMyAdmin (for MySQL) or pgAdmin (for PostgreSQL) to create the database.
2. create .env file using .env.example. you can modify .env file according to your credentials

## Running The Application
npm start

## API Endpoints

The following endpoints are available in the Read To Win Publications API:

GET /api/authors/allAuthors: Retrieve all authors.

POST /api/authors/addAuthor: Create a new author.

GET /api/books/allBooks: Retrieve all books.

POST /api/books/addBook: Create a new book.

GET /api/categories/allCategories: Create a new category.

POST /api/categories/addCategory: Retrieve all categories.

POST /api/books/:bookId/likes: Like to a Book

GET /api/books/search/:isbnNo : Search book by ISBN No

For each endpoint, replace :bookId with the corresponding ID value.


## Generating Like Count Report
The application automatically generates a like count report for each author every 5 minutes. The report includes the author's ID, name, and total like count for their books. The report can be output to the console, sent via email, or logged.




