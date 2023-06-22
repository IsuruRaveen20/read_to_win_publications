const express = require('express')

//import Book Controller
const bookController = require("../controllers/bookController")

//router
const router = require('express').Router()

//Routes for Books
router.post('/addBook', bookController.addBook)
router.get('/allBooks', bookController.getAllBooks)

module.exports = router;