const express = require("express");
const express_app = require("./express-app");
const { databaseConnection } = require("./database");
const { PORT } = require("./config");

const StartServer = async () => {
  const app = express();

  await databaseConnection();
  await express_app(app);

  app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
  })
    .on("error", (err) => {
      console.log(err);
      process.exit();
    })
}

StartServer();