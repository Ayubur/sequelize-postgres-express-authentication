const { dbConnection, sequelize } = require("./connection");
module.exports = {
  databaseConnection: dbConnection,
  sequelize: sequelize
}