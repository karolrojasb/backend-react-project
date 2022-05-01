const express = require('express')
const UserController = require('../controllers/user.controller')
const user_router = express.Router()

/*http://localhost:3977/api/v1/users/user */
user_router.post('/user', UserController.createUser)

module.exports = user_router
