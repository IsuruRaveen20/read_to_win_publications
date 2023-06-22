const express = require('express')

//import Author Controller
const authorController = require("../controllers/categoryController")

//router
const router = require('express').Router()


//Routes for authors
router.post('/addCategory', authorController.createCategory)
// router.get('/allAuthors', authorController.getAllAuthors)

module.exports = router;