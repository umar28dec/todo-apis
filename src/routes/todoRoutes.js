const express = require("express");
const Todo = require("../models/todo"); // Import your Mongoose model
const TodoController = require("../controllers/todoController");

const router = express.Router();
const todoController = new TodoController(Todo); // Pass the model here

router.post("/todos", (req, res) => todoController.createTodo(req, res));
router.get("/todos", (req, res) => todoController.getTodos(req, res));
router.put("/todos/:id", (req, res) => todoController.updateTodo(req, res));
router.delete("/todos/:id", (req, res) => todoController.deleteTodo(req, res));

module.exports = router;
