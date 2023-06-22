module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
      // Define user properties here
    });
  
    User.associate = (models) => {
      User.belongsToMany(models.Book, { through: 'Like' });
    };
  
    return User;
  };
  