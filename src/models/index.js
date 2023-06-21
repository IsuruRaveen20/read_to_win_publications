const dbConfig = require('../config/database');

const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle

    }
}
)

sequelize.authenticate()
    .then(() => {
        console.log('connected..')
    })
    .catch(err => {
        console.log('Error' + err)
    })

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.authors = require('./Author')(sequelize, DataTypes)

db.sequelize.sync({ force: false })
    .then(() => {
        console.log('Re-sync done!')
    })

module.exports = db

// 1 to Many Relation
// db.authors.hasMany(db.books, {
//     foreignKey: 'authorId',
//     as: 'books'
// });

// db.books.belongsTo(db.authors, {
//     foreignKey: 'authorId',
//     as: 'author'
// });







