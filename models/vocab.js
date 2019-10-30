module.exports = function (sequelize, DataTypes) {
    const Vocab = sequelize.define("Vocab", {
        nativeword: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                max: {
                    args: [30],
                    msg: "Word must be less than 30 characters long."
                }
            }
        },
        translatedword: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                max: {
                    args: [30],
                    msg: "Word must be less than 30 characters long."
                }
            }
        },
        difficulty: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                min: 1,
                max: 3
            }
        }
    });

    Vocab.associate = function (models) {
        Vocab.belongsTo(models.Language, {
            foreignKey: {
                allowNull: false
            }
        });

        Vocab.belongsTo(models.List, {
            foreignKey: {
                allowNull: false
            }
        });

        Vocab.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });

    };

    return Vocab;
};
