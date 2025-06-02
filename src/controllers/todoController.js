/**
 * @swagger
 * components:
 *   schemas:
 *     Todo:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the todo
 *         title:
 *           type: string
 *           description: The todo title
 *         completed:
 *           type: boolean
 *           description: Todo completion status
 *       example:
 *         _id: 60c72b2f9b1e8e001c8e4b8a
 *         title: Buy groceries
 *         completed: false
 */

class TodoController {
  constructor(todoModel) {
    this.todoModel = todoModel;
  }

  /**
   * @swagger
   * /todos:
   *   post:
   *     summary: Create a new todo
   *     tags: [Todos]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Todo'
   *     responses:
   *       201:
   *         description: The created todo item.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Todo'
   *       500:
   *         description: Server error
   */
  async createTodo(req, res) {
    try {
      const newTodo = await this.todoModel.create(req.body);
      res.status(201).json(newTodo);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  /**
   * @swagger
   * /todos:
   *   get:
   *     summary: Get all todos
   *     tags: [Todos]
   *     responses:
   *       200:
   *         description: List of todos
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Todo'
   *       500:
   *         description: Server error
   */
  async getTodos(req, res) {
    try {
      const todos = await this.todoModel.find();
      res.status(200).json(todos);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  /**
   * @swagger
   * /todos/{id}:
   *   put:
   *     summary: Update a todo by ID
   *     tags: [Todos]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The todo ID
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Todo'
   *     responses:
   *       200:
   *         description: The updated todo
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Todo'
   *       404:
   *         description: Todo not found
   *       500:
   *         description: Server error
   */
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

  /**
   * @swagger
   * /todos/{id}:
   *   delete:
   *     summary: Delete a todo by ID
   *     tags: [Todos]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The todo ID
   *     responses:
   *       204:
   *         description: Todo deleted successfully
   *       404:
   *         description: Todo not found
   *       500:
   *         description: Server error
   */
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
