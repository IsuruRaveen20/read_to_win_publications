// module.exports = (sequelize, DataTypes) => {
//     const Book = sequelize.define("Book", {
//       isbnNo: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         validate: {
//           isAlphanumeric: {
//             msg: "ISBN no should only contain alphanumeric characters.",
//           },
//         },
//       },
//       category: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         validate: {
//           is: {
//             args: /^[A-Za-z\s]+$/, // Allow letters and white spaces
//             msg: "Category should only contain letters.",
//           },
//         },
//       },
//       title: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         validate: {
//           isAlphanumeric: {
//             msg: "Title should only contain alphanumeric characters.",
//           },
//         },
//       },
//       likeCount: {
//         type: DataTypes.INTEGER,
//         defaultValue: 0,
//       },
//     });

//     Book.associate = (models) => {
//       Book.belongsTo(models.Author, {
//         foreignKey: {
//           name: 'authorId',
//           allowNull: false
//         },
//       });
//       Book.belongsToMany(models.Category, { through: 'BookCategory' });
//       Book.belongsToMany(models.User, { through: 'Like' });
//     };

//     return Book;
//   };

module.exports = (sequelize, DataTypes) => {
    const Book = sequelize.define("Book", {
        isbnNo: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isAlphanumeric: {
                    msg: "ISBN no should only contain alphanumeric characters.",
                },
            },
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is: {
                    args: /^[A-Za-z\s]+$/, // Allow letters and white spaces
                    msg: "Category should only contain letters.",
                },
            },
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isAlphanumeric: {
                    msg: "Title should only contain alphanumeric characters.",
                },
            },
        },
        likeCount: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
    });

    Book.associate = (models) => {
        Book.belongsTo(models.Author, {
            foreignKey: {
                name: 'authorId',
                allowNull: false
            },
        });
        Book.belongsToMany(models.Category, { through: 'BookCategory' });
        Book.belongsToMany(models.User, { through: 'Like' });
    };

    return Book;
};
