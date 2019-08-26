const UUID = require('uuid/v4');
const { db } = require('../config/db')
module.exports.create_todo = function (req, res, next) {
    try {
        const todo = req.body;
        todo.created_by = req.user ? req.user.id : 'anonymous';
        todo.is_completed = false;
        todo.id = UUID()
        db.get('todos')
            .push(todo)
            .write()
        res.status(201).send(todo)
    } catch (e) {
        res.status(500).send({ status: 'failure', message: 'Internal error' })
    }

}
module.exports.get_todo = function (req, res, next) {
    let todos = []
    if (req.params && req.params.id) {
        todo = db.get('todos').find({ id: req.params.id }).value()
        if (todo) { todos.push(todo) }
    } else {
        todos = db.get('todos').value()
    }
    res.status(200).send(todos)
}
module.exports.update_todo = function (req, res, next) {
    let todo = req.body;
    if (req.params && req.params.id) {
        db.get('todos')
            .find({ id: req.params.id })
            .assign(todo)
            .write()
        res.status(202).send({ status: 'success', message: 'Todo updated successfully' })
    } else {
        res.status(404).send({ status: 'failure', message: 'Todo not found' })
    }
}
module.exports.delete_todo = function (req, res, next) {
    if (req.params && req.params.id) {
        db.get('todos')
            .remove({ id: req.params.id })
            .write()
        res.status(202).send({ status: 'success', message: 'Todo deleted successfully' })
    } else {
        res.status(404).send({ status: 'failure', message: 'Todo not found' })
    }
}