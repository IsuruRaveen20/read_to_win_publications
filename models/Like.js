module.exports = (sequelize, DataTypes) => {
    const Like = sequelize.define('Like', {
      count: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          isInt: {
            msg: 'Like count should be an integer.',
          },
          min: {
            args: [0],
            msg: 'Like count should be greater than or equal to 0.',
          },
        },
      },
    });
  
    Like.associate = (models) => {
      Like.belongsTo(models.Book, {
        foreignKey: {
          name: 'bookId',
          allowNull: false,
        },
      });
    };
  
    return Like;
  };
  