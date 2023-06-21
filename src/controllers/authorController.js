const Author = require("../models/Author");

//Controller actions for authors
exports.getAllAuthors = async (req, res) => {
    try {
        const authors = await Author.findAll();
        res.json(authors);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.createAuthor = async (req, res) => {
    const { firstName, lastName, email, contactNo } = req.body;
    try {
        const author = await Author.create({
            firstName,
            lastName,
            email,
            contactNo,
        });
        res.status(201).json(author);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};