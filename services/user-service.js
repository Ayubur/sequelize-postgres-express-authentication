const UserRepository = require("../repository/user-repository");
const { FormateData, GeneratePassword, GenerateSalt, GenerateSignature, ValidatePassword } = require("../utils");
const HttpError = require("../utils/helpers/HttpError");

class UserService {
  constructor() {
    this.repository = new UserRepository();
  }

  async SignUp(userInputs) {
    const { email, password, name } = userInputs;
    let userPassword = await GeneratePassword(password);
    const existingUser = await this.repository.CreateUser({ email, password: userPassword, name });
    const token = await GenerateSignature({ email: email, id: existingUser._id });
    return { token };
  }

  async SignIn(userInputs) {

    const { email, password } = userInputs;

    const existingUser = await this.repository.FindUser({ email });

    if (existingUser) {
      const validPassword = await ValidatePassword(password, existingUser.password);
      if (validPassword) {
        const token = await GenerateSignature({ email: existingUser.email, id: existingUser.id });
        return { token }
      } else {
        throw new HttpError({ message: "Invalid Password", statusCode: 400 })
      }
    } else {
      throw new HttpError({ message: "Invalid Email", statusCode: 404 })
    }
  }

}

module.exports = UserService;