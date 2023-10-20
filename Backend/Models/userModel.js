const mongoose = require('mongoose');

// Define User Schema
const registerSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });

// Create User model
const registerModel = mongoose.model('registerModel', registerSchema);









// Define Todo Schema
const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'registerModel', // Use the model name you defined
  },
}, { timestamps: true });

// Create Todo model
const todoModel = mongoose.model('todoModel', todoSchema);






module.exports = { registerModel, todoModel };
