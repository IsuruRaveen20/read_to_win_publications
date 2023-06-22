module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define("Category", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Category name is required."
        },
        isAlpha: {
          args: true,
          msg: "Category name should only contain alphabetic characters."
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Category description is required."
        }
      }
    }
  });

  Category.associate = (models) => {
    Category.belongsToMany(models.Book, { through: 'BookCategory' });
  };

  return Category;
};
