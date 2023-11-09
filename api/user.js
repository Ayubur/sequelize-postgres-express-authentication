const UserService = require("../services/user-service");
const { FormateResponseData } = require("../utils");
const { ERROR, RESULT } = require("../utils/constants/enums/ResponseType");

module.exports = (app) => {
  const userSerice = new UserService();

  app.post("/signup", async (req, res, next) => {
    const { email, password, name } = req.body;
    try {
      const data = await userSerice.SignUp({ email, password, name });
      FormateResponseData({ type: RESULT, res, result: data })
    } catch (error) {
      if (error.statusCode) {
        res.status(error.statusCode);
      }
      FormateResponseData({ type: ERROR, res, error })
    }
  })
}