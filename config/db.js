const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('./db.json')
const db = low(adapter)

module.exports.db = db

module.exports.initialise = function(){
    db.defaults({ todos: [], users: []})
    .write()
}