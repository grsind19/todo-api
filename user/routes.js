const express = require('express')
const router = express.Router();
const user_controller = require('./controller')

router.post('/login', user_controller.sign_in)
router.post('/signup', user_controller.sign_up)

module.exports = router