module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "First name is required."
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Last name is required."
        }
      }
    },
    contactNo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Contact number is required."
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
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Username must be unique."
      },
      validate: {
        notNull: {
          msg: "Username is required."
        }
      }
    }
  });

  // Associations
  User.associate = (models) => {
    User.belongsToMany(models.Book, { through: 'Like' });
  };

  return User;
};
