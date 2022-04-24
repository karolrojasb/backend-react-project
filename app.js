const express = require('express')
const bodyparser = require('body-parser')
const APP = express()
const { API_VERSION } = require('./config')

APP.use(bodyparser.urlencoded({extended: false}))
APP.use(bodyparser.json())

module.exports = APP
