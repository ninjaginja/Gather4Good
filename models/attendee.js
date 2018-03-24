module.exports = function (sequelize, DataTypes) {
    var Attendee = sequelize.define("Attendee", {
        eventId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        timestamps: false
    });
    return Attendee;
}
