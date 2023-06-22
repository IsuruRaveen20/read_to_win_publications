const dbConfig = require('../config/database');
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
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
);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connected to the database successfully...');
  })
  .catch(err => {
    console.log('Error: ' + err);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Models
db.Author = require('./Author')(sequelize, DataTypes);
db.Book = require('./Book')(sequelize, DataTypes);
db.Category = require('./Category')(sequelize, DataTypes);
db.User = require('./User')(sequelize, DataTypes);

// Associations
db.Author.hasMany(db.Book, { foreignKey: 'authorId' });
db.Book.belongsTo(db.Author, { foreignKey: 'authorId' });
db.Book.belongsToMany(db.Category, { through: 'BookCategory' });
db.Category.belongsToMany(db.Book, { through: 'BookCategory' });
db.Book.belongsToMany(db.User, { through: 'Like' });
db.User.belongsToMany(db.Book, { through: 'Like' });

// Synchronize models with the database
db.sequelize.sync({ force: false })
  .then(() => {
    console.log('Re-sync done!');
  });

module.exports = db;

// const dbConfig = require('../config/database');
// const { Sequelize, DataTypes } = require('sequelize');

// const sequelize = new Sequelize(
//   dbConfig.DB,
//   dbConfig.USER,
//   dbConfig.PASSWORD,
//   {
//     host: dbConfig.HOST,
//     dialect: dbConfig.dialect,
//     operatorsAliases: false,
//     pool: {
//       max: dbConfig.pool.max,
//       min: dbConfig.pool.min,
//       acquire: dbConfig.pool.acquire,
//       idle: dbConfig.pool.idle
//     }
//   }
// );

// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Connected to the database successfully...');
//   })
//   .catch(err => {
//     console.log('Error: ' + err);
//   });

// const db = {};

// db.Sequelize = Sequelize;
// db.sequelize = sequelize;

// // Models
// db.Author = require('./Author')(sequelize, DataTypes);
// db.sequelize.sync({ force: false })
//   .then(() => {
//     console.log('Re-sync done!');
//   });

// module.exports = db;
// db.Book = require('./Book')(sequelize, DataTypes);
// db.Category = require('./Category')(sequelize, DataTypes);
// db.Like = require('./Like')(sequelize, DataTypes);

// Associations
// db.Book.belongsToMany(db.Category, { through: 'BookCategory' });
// db.Category.belongsToMany(db.Book, { through: 'BookCategory' });

// db.Book.hasMany(db.Like);
// db.Like.belongsTo(db.Book);
// 
// db.sequelize.sync({ force: false })
//   .then(() => {
//     console.log('Re-sync done!');
//   });

// module.exports = db;

// const dbConfig = require('../config/database');

// const { Sequelize, DataTypes } = require('sequelize');

// const sequelize = new Sequelize(
//     dbConfig.DB,
//     dbConfig.USER,
//     dbConfig.PASSWORD, {
//     host: dbConfig.HOST,
//     dialect: dbConfig.dialect,
//     operatorsAliases: false,

//     pool: {
//         max: dbConfig.pool.max,
//         min: dbConfig.pool.min,
//         acquire: dbConfig.pool.acquire,
//         idle: dbConfig.pool.idle

//     }
// }
// )

// sequelize.authenticate()
//     .then(() => {
//         console.log('Connected to the database successfully...')
//     })
//     .catch(err => {
//         console.log('Error' + err)
//     })

// const db = {}

// db.Sequelize = Sequelize
// db.sequelize = sequelize


// db.authors = require('./Author')(sequelize, DataTypes)
// db.books = require('./Book')(sequelize, DataTypes)

// // db.authors.hasMany(db.books); // An author can have many books
// // db.books.belongsTo(db.authors); // A book belongs to an author

// db.sequelize.sync({ force: false })
//     .then(() => {
//         console.log('Re-sync done!')
//     })

// module.exports = db







