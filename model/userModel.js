const sequelize = require("sequelize");
const db = require("../config/database");
var user = db.define(
    "user",
    {
        id: { type: sequelize.INTEGER, primaryKey: true },
        username: { type: sequelize.STRING },
        password: { type: sequelize.STRING },
        token: { type: sequelize.STRING },
    },
    {
        // freeze name table not using *s on name
        freezeTableName: true,
        // dont use createdAt/update
        timestamps: false,
    }
);
module.exports = user;