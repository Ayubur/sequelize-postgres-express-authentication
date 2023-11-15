const { DataTypes } = require("sequelize");
const { sequelize } = require("../database");

const UserModel = sequelize.define("user", {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

UserModel.sync({ force: false, alter: true }).then(() => {
  console.log("User Model synced");
});

module.exports = UserModel;