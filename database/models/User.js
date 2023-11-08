const { DataTypes } = require("sequelize");
const { sequelize } = require("..");

const UserModel = sequelize.define("User", {
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

UserModel.sync().then(() => {
  console.log("User Model synced");
});

module.exports = UserModel;