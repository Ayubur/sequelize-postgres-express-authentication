const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {
  APP_SECRET
} = require("../config");
const { ERROR, RESULT } = require("./constants/enums/ResponseType");


//Utility functions
module.exports.GenerateSalt = async () => {
  return await bcrypt.genSalt();
};

module.exports.GeneratePassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

module.exports.ValidatePassword = async (
  enteredPassword,
  savedPassword
) => {
  return await bcrypt.compare(enteredPassword, savedPassword);
};

module.exports.GenerateSignature = async (payload) => {
  try {
    return await jwt.sign(payload, APP_SECRET, { expiresIn: "30d" });
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports.ValidateSignature = async (req) => {
  try {
    const signature = req.get("Authorization");
    const payload = await jwt.verify(signature.split(" ")[1], APP_SECRET);
    req.user = payload;
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports.FormateResponseData = ({ type, res, result, error }) => {
  switch (type) {
    case RESULT:
      res.status(res.statusCode ?? 200).json({
        type: RESULT,
        message: res.message || "OK",
        result: result,
        error: null,
        code: res.statusCode ?? 200,
      });
      break;
    case ERROR:
      res.status(res.statusCode ?? 500).json({
        type: ERROR,
        message: error.message,
        result: error.result ?? null,
        error: process.env.ENV_TYPE === "production" ? null : error.stack,
        code: res.statusCode ?? 500,
      });
      break;
  }
};
