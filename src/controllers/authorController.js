const Author = require("../models/Author");

//Register Author
const createAuthor = async (req, res) => {
    let info = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        contactNo: req.body.contactNo,
    }

    const author = await Author.create(info)
    res.status(200).send(author)
    console.log(author)
}

//Get all Authors
const getAllAuthors = async (req, res) => {
    let authors = await Author.findAll({})
    res.status(200).send(authors)
}




