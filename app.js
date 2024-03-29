const express = require('express');
const app = express()
const body_parser = require('body-parser')
const helmet = require('helmet')
const cors = require('cors')
const database = require('./config/db')
const auth = require('./config/auth')

//const PORT = process.env.NODE_ENV || 3000;
const PORT = process.env.PORT || 3000;

app.use(body_parser.urlencoded({
    extended: true
}));
app.use(body_parser.json());

//Handlins xss and security issues
app.use(helmet())
app.use(cors())

database.initialise()

app.use(express.static('tod-app-ui'))



const todo_route = require('./todo/routes')
const user_route = require('./user/routes')
app.use('/api/todo', auth.verify_token,  todo_route)
app.use('/api/user', user_route)

app.listen(PORT, () => {
    console.log(`todo api has started in ${PORT}`)
})