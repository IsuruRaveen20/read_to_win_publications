module.exports = (sequelize, DataTypes) => {
  const Author = sequelize.define("Author", {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "First name is required."
        },
        is: {
          args: /^[A-Za-z]+$/, // Allow letters and white spaces
          msg: "First name should only contain letters."
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Last name is required."
        },
        is: {
          args: /^[A-Za-z]+$/, // Allow letters and white spaces
          msg: "Last name should only contain letters."
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Email is required."
        },
        isEmail: {
          msg: "Invalid email format."
        }
      }
    },
    contactNo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Contact number is required."
        },
        isNumeric: {
          msg: "Contact number should only contain digits."
        },
        len: {
          args: [10, 10],
          msg: "Contact number should have exactly 10 digits."
        }
      }
    }
  });

  Author.associate = (models) => {
    Author.hasMany(models.Book, {
      foreignKey: {
        name: 'authorId',
        allowNull: false
      },
    });
  };

  return Author;
};
