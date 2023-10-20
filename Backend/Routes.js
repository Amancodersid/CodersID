const express = require("express");
const { registration, login } = require("./controller/register");
const { createTodo, getAllTodos, updateTodo, deleteTodo } = require("./controller/todo");
const { verifyToken } = require("./Middleware/jwtverify");
const router = express.Router();

//user
router.post('/register',registration)
router.post('/login',login)

//todo
router.post('/createTodo',verifyToken,createTodo)
router.get('/getAllTodos',verifyToken,getAllTodos)
router.post('/updateTodo/:id',verifyToken,updateTodo)
router.delete('/deleteTodo/:id',verifyToken,deleteTodo)



module.exports = { router };
