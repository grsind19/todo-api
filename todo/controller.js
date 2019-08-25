const UUID = require('uuid/v4');
const { db } = require('../config/db')
module.exports.create_todo = function (req, res, next) {
    try {
        const todo = req.body;
        todo.created_by = req.user? req.user.id:'anonymous';
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
    let todos =[]
    if(req.params && req.params.id){
        todo = db.get('todos').find({id: req.params.id}).value()
        if(todo){todos.push(todo)}
    }else{
        todos =db.get('todos').value()
    }
    res.status(200).send(todos)
}
module.exports.update_todo = function (req, res, next) {
    const todos =db.get('posts').value()
    res.status(202).send(todos)
}
module.exports.delete_todo = function (req, res, next) {
    const todo = req.body;
    res.status(204).send(todo)
}