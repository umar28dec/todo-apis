require("dotenv").config();
require("./db");

const express = require("express");
const bodyParser = require("body-parser");
const todoRoutes = require("./routes/todoRoutes");
const { requestLogger, errorLogger } = require("./logger");
const { swaggerUi, swaggerSpec } = require("./swagger");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Use request logger middleware
app.use(requestLogger());

// Swagger docs route
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
