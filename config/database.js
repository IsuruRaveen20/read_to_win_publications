module.exports = {
  // Database connection configuration
  HOST: process.env.HOST,       // Hostname of the database server
  USER: process.env.USER,       // Database user
  PASSWORD: process.env.PASSWORD,   // Password for the database user
  DB: process.env.DB,           // Name of the database
  dialect: 'mysql',             // Database dialect (MySQL in this case)

  // Connection pool configuration
  pool: {
    max: 5,                     // Maximum number of connection instances in the pool
    min: 0,                     // Minimum number of connection instances in the pool
    acquire: 30000,             // Maximum time (in milliseconds) to acquire a connection before timing out
    idle: 10000                 // Maximum time (in milliseconds) that a connection can be idle before being released
  }
};
