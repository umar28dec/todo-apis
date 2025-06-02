require("dotenv").config();
require("./db");

const express = require("express");
const bodyParser = require("body-parser");
const todoRoutes = require("./routes/todoRoutes");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const { requestLogger, errorLogger } = require("./logger");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Use request logger middleware
app.use(requestLogger());

// Swagger setup
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
        url: `http://${process.env.HOST || "localhost"}:${PORT}`,
      },
    ],
  },
  apis: ["./src/controllers/*.js"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the Node.js Todo API!");
});

app.use(todoRoutes);

// Use error logger middleware
app.use(errorLogger);

app.listen(PORT, "0.0.0.0", () => {
  if (process.env.ENABLE_LOGGING === "true") {
    console.log(`Logging is enabled`);
  }
  console.log(`Server is running on port ${PORT}`);
});
