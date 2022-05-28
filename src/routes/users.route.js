const express = require('express')
const UserController = require('../controllers/user.controller')
const user_router = express.Router()

/*http://localhost:3977/api/v1/users/user */
user_router.post('/user', UserController.createUser)

/*http://localhost:3977/api/v1/users/signup */
user_router.post("/signup", UserController.signUp)

/*http://localhost:3977/api/v1/users/signin */
user_router.post("/signin", UserController.signIn)

module.exports = user_router
