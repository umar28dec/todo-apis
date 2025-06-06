const swaggerJsdoc = require("swagger-jsdoc");

const PORT = process.env.PORT || 3000;

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Node.js Todo API",
      version: "1.0.0",
      description: "A simple Todo API with Swagger docs",
    },
    servers: [
      {
        url: process.env.HOST || `http://localhost:${PORT}`,
        description: "Development server",
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

module.exports = { swaggerSpec };
