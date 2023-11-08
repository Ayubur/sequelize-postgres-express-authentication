const UserService = require("../services/user-service")

module.exports = (app) => {
  const userSerice = new UserService();

  app.post("/signup", async (req, res, next) => {
    const { email, password, name } = req.body;
    const data = await userSerice.SignUp({ email, password, name });
    res.send(data);
  })
}