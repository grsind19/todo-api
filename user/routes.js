const express = require('express')
const router = express.Router();
const todo_controller = require('./controller')

router.post('/user', todo_controller.create_todo)
router.get('/todo', todo_controller.get_todo)
router.get('/todo/:id', todo_controller.get_todo)
router.put('/todo/:id', todo_controller.update_todo)
router.delete('/todo/:id',todo_controller.delete_todo)

module.exports = router