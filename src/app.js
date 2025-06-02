const express = require("express");
const bodyParser = require("body-parser");
const todoRoutes = require("./routes/todoRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the Node.js Todo API!");
});

app.use(todoRoutes);

app.listen(3000, "0.0.0.0", () => {
  console.log("Server is running on port 3000");
});
