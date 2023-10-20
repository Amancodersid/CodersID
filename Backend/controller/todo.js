const { todoModel } = require("../Models/userModel");


// Create a new todo
let createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;
    const userId = req.userId;
    if (userId != req.body.user) return res.status(400).send({ status: false, message: "wrong user" })
      if (!title) {
        return res
          .status(400)
          .send({ status: false, message: "Title is required" });
      }

    const newTodo = await todoModel.create({ title, description, user: userId });

    res
      .status(201)
      .json({
        status: true,
        message: "Todo created successfully",
        todo: newTodo,
      });
  } catch (error) {
    console.error("Error creating todo:", error);
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};




// Get all todos for a user
let getAllTodos = async (req, res) => {
  try {
    const userId = req.userId;
    const todos = await todoModel.find({ user: userId });

    res.status(200).json({ status: true, todos });
  } catch (error) {
    console.error("Error getting todos:", error);
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};




// Update a todo
let updateTodo = async (req, res) => {
  try {
    const { title, description, completed } = req.body;
    const todoId = req.params.id;
    const userId = req.userId;


    const updatedTodo = await todoModel.findOneAndUpdate(
      { _id: todoId, user: userId },
      { title, description, completed },
      { new: true } // Return the updated todo
    );

    if (!updatedTodo) {
      return res.status(404).json({ status: false, message: "Todo not found" });
    }

    res
      .status(200)
      .json({
        status: true,
        message: "Todo updated successfully",
        todo: updatedTodo,
      });
  } catch (error) {
    console.error("Error updating todo:", error);
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};

// Delete a todo
let deleteTodo = async (req, res) => {
  try {
    const todoId = req.params.id;
    const userId = req.userId; // Assuming you have user information in req.user

    const deletedTodo = await todoModel.findOneAndDelete({
      _id: todoId,
      user: userId,
    });

    if (!deletedTodo) {
      return res.status(404).json({ status: false, message: "Todo not found" });
    }

    res
      .status(200)
      .json({ status: true, message: "Todo deleted successfully" });
  } catch (error) {
    console.error("Error deleting todo:", error);
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};

module.exports = { createTodo, getAllTodos, updateTodo, deleteTodo };
