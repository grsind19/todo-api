const express = require('express')
const router = express.Router();
const todo_controller = require('./controller')

router.post('/', todo_controller.create_todo)
router.get('/', todo_controller.get_todo)
router.get('/:id', todo_controller.get_todo)
router.put('/:id', todo_controller.update_todo)
router.delete('/:id',todo_controller.delete_todo)

module.exports = router