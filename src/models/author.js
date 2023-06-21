const { Datatypes } = require('sequelize');
const sequelize = require('../config/database');

const Author = sequelize.define('author', {
    firstName:{
        type:Datatypes.STRING,
        allowNull:false,
    },
    lastName:{
        type:Datatypes.STRING,
        allowNull:false,
    },
    email:{
        type:Datatypes.STRING,
        allowNull:false,
        unique:true,
    },
    contactNo:{
        type:Datatypes.STRING,
        allowNull:false,
    },
});

module.exports = Author;
