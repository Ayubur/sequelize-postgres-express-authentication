const UserService = require("../services/user-service");
const { FormateResponseData } = require("../utils");
const { ERROR, RESULT } = require("../utils/constants/enums/ResponseType");

module.exports = (app) => {

  /**
   * @swagger
   * /signup:
   *   post:
   *     summary: For registration. Suceessfull registration will return a jwt token
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               name:
   *                 type: string
   *                 description: The user's name.
   *                 example: Leanne Graham
   *               email:
   *                 type: string
   *                 description: The users email
   *                 example: ayubur@mail.co
   *               password:
   *                 type: string
   *                 description: The users password
   *                 example: pass1234
   *     responses:
   *       201:
   *         description: Created
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 token:
   *                   type: string
   *                   description: jwt token
  */

    /**
   * @swagger
   * /login:
   *   post:
   *     summary: For login. Suceessfull login will return a jwt token
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               email:
   *                 type: string
   *                 description: The users email
   *                 example: ayubur@mail.co
   *               password:
   *                 type: string
   *                 description: The users password
   *                 example: pass1234
   *     responses:
   *       200:
   *         description: Created
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 token:
   *                   type: string
   *                   description: jwt token
  */

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

  app.post("/login", async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const data = await userSerice.SignIn({ email, password });
      FormateResponseData({ type: RESULT, res, result: data })
    } catch (error) {
      if (error.statusCode) {
        res.status(error.statusCode);
      }
      FormateResponseData({ type: ERROR, res, error })
    }
  })
}