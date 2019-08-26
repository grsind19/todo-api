const UUID = require('uuid/v4');
const { db } = require('../config/db')
module.exports.sign_up = function (req, res, next) {
    try {
        const user = req.body;
        user.id = UUID()
        db.get('users')
            .push(user)
            .write()
        res.status(201).send(user)
    } catch (e) {
        res.status(500).send({ status: 'failure', message: 'Internal error' })
    }
}
module.exports.sign_in = function (req, res, next) {
    let todos = []
    if (req.params && req.params.id) {
        todo = db.get('todos').find({ id: req.params.id }).value()
        if (todo) { todos.push(todo) }
    } else {
        todos = db.get('todos').value()
    }
    res.status(200).send(todos)
}