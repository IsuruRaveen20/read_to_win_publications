module.exports = (sequelize, DataTypes) => {
    const Book = sequelize.define("book", {
        isbnNo: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isAlphanumeric: {
                    msg: "ISBN no should only contain alphanumeric characters."
                }
            }
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is: {
                    args: /^[A-Za-z\s]+$/, // Allow letters and white spaces
                    msg: "Category should only contain letters."
                }
            }
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isAlphanumeric: {
                    msg: "Title should only contain alphanumeric characters."
                }
            }
        },
        authorName: { // Changed attribute name to 'authorName'
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is: {
                    args: /^[A-Za-z\s]+$/, // Allow letters and white spaces
                    msg: "Author name should only contain letters."
                }
            }
        }
    });

    return Book;
};
