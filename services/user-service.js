const UserRepository = require("../database/repository/user-repository");
const { FormateData, GeneratePassword, GenerateSalt, GenerateSignature } = require("../utils");

class UserService {
  constructor() {
    this.repository = new UserRepository();
  }

  async SignUp(userInputs) {
    const { email, password, name } = userInputs;
    let userPassword = await GeneratePassword(password, 10);
    const existingUser = await this.repository.CreateUser({ email, password: userPassword, name });
    const token = await GenerateSignature({ email: email, id: existingUser._id });
    return { id: existingUser.id, token };
  }

}

module.exports = UserService;