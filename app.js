const express = require('express')
const bodyparser = require('body-parser')
const cors = require('cors')
const APP = express()
const { API_VERSION } = require('./config')

APP.use(bodyparser.urlencoded({extended: false}))
APP.use(cors())
APP.use(bodyparser.json())

module.exports = APP
