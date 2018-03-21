module.exports = function(sequelize, DataTypes) {
    var Event = sequelize.define("Event" , {
        title: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        cause: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        time: {
            type: DataTypes.DATE,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
        },
        organizer_id: {
            type: DataTypes.INTEGER
        },
        img_url: {
            type: DataTypes.STRING,
            validate: {
                isUrl: true
            }
        },
        location_name: {
            type: DataTypes.STRING
            // optional name for location e.g.) "City Hall"
        },
        location_street: {
            type: DataTypes.STRING,
            allowNull: false
        },
        location_city: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        location_state: {
            type: DataTypes.CHAR(2),
            allowNull: false
        },
        location_zip: {
            type: DataTypes.CHAR(5),
            allowNull: false
        }
    });

    // Event.associate = function(models) {
    //     Event.belongsTo(models.User, {
    //         foreignKey: {
    //             allowNull: false
    //         }
    //     });
    // };

    return Event;
}
