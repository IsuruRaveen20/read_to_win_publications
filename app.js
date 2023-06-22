const express = require('express')
require('dotenv').config();
const app = express()

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


// routers
const authorRouter  = require('./src/routes/authorRoutes')
const bookRouter  = require('./src/routes/bookRoutes')

//Api
app.use('/api/authors', authorRouter)
app.use('/api/books', bookRouter)


//port
const PORT = process.env.PORT || 4000

//server
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})