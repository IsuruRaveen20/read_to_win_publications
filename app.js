const express = require('express')
require('dotenv').config();
const app = express()

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


// routers
const router = require('./routes/authorRouter')
app.use('/api/authors', router)

//port
const PORT = process.env.PORT || 4045

//server
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})