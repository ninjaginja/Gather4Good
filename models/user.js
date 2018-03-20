module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
        name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(100),
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
            // built into the user authentication? Hashed in database?
        }
    });

    User.associate = function(models) {
        User.hasMany(models.Event, {
            onDelete: "cascade"
        });
    };

    return User;
}
