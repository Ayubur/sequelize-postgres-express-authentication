const swaggerJsDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "API with Swagger",
      version: "0.1.0",
      description:
        "This is a simple authentication application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "ayubur",
        email: "ayubur.rahaman161@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./api/*.js"],
};

const specs = swaggerJsDoc(options);

module.exports = specs;