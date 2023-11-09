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
}

module.exports = UserRepository;