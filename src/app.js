require("dotenv").config(); // Add this at the top

const express = require("express");
const bodyParser = require("body-parser");
const todoRoutes = require("./routes/todoRoutes");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

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
  apis: ["./src/controllers/*.js"], // Path to your API docs
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the Node.js Todo API!");
});

app.use(todoRoutes);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});
