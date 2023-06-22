const express = require('express')

//import Author Controller
const authorController = require("../controllers/authorController")

//router
const router = require('express').Router()


//Routes for authors
router.post('/addAuthor', authorController.addAuthor)
router.get('/allAuthors', authorController.getAllAuthors)

module.exports = router;