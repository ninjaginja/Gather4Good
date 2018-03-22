module.exports = function (sequelize, DataTypes) {
    var Cause = sequelize.define("Cause", {
        cause: {
            type: DataTypes.STRING
        }
    },{
        timestamps: false
    });

    Cause.associate = function(models) {
        Cause.hasMany(models.Event)
    };

    return Cause;
}