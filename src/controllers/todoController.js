class TodoController {
  constructor(todoModel) {
    this.todoModel = todoModel;
  }

  async createTodo(req, res) {
    try {
      const newTodo = await this.todoModel.create(req.body);
      res.status(201).json(newTodo);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getTodos(req, res) {
    try {
      const todos = await this.todoModel.find();
      res.status(200).json(todos);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateTodo(req, res) {
    try {
      const updatedTodo = await this.todoModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedTodo) {
        return res.status(404).json({ message: "Todo not found" });
      }
      res.status(200).json(updatedTodo);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async deleteTodo(req, res) {
    try {
      const deletedTodo = await this.todoModel.findByIdAndDelete(req.params.id);
      if (!deletedTodo) {
        return res.status(404).json({ message: "Todo not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = TodoController;
