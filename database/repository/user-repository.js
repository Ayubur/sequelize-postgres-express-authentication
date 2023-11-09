const UserModel = require("../models/User");

class UserRepository {
  constructor() { }

  async CreateUser({ name, email, password }) {
    const userResult = await UserModel.create({
      name,
      email,
      password
    })
    return userResult;
  }

  async FindUser({ email }) {
    const existingUser = await UserModel.findOne({ where: { email } });
    return existingUser;
  }
}

module.exports = UserRepository;