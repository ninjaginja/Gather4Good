module.exports = function (sequelize, DataTypes) {
    var Cause = sequelize.define("Cause", {
    });

    Cause.associate = function(models) {
        Cause.hasMany(models.Event)
    };

    return Cause;
}