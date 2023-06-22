module.exports = (sequelize, DataTypes) => {
    // Define the Book model
    const Book = sequelize.define("Book", {
        isbnNo: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "ISBN No is required."
                },
                isAlphanumeric: {
                    args: true,
                    msg: "ISBN no should only contain alphanumeric characters.",
                },
            },
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Category is required."
                },
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
                notNull: {
                    msg: "Title is required."
                },
                is: {
                    args: /^[A-Za-z\s]+$/, // Allow letters and white spaces
                    msg: "Title should only contain letters.",
                },
            },
        },
        likeCount: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
    });

    // Define associations with other models
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
