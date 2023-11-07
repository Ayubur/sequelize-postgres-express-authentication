const { DB, HOST, PASSWORD, USER, dialect, pool } = require("../config");
const Sequelize = require("sequelize");

module.exports = async () => {
  const sequelize = new Sequelize(DB, USER, PASSWORD, {
    host: HOST,
    dialect: dialect,
    operatorsAliases: false,
    pool: {
      max: pool.max,
      min: pool.min,
      acquire: pool.acquire,
      idle: pool.idle
    }
  });

  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully");
    return sequelize;
  } catch (error) {
    console.log("Error in connecting database====", error);
  }
}