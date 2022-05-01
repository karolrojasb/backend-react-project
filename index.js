const express = require('express')
const mongoose = require('mongoose')
const APP = require('./app')
const PORT_SERVER = process.env.PORT || 3977
const {logErrors, errorHandler} = require('./src/middlewares/handlers/errors.handler')
const { API_VERSION, IP_SERVER, PORT_DB} = require('./config')
const routerAPI = require('./src/routes/index')

mongoose.connect(
  `mongodb://0.0.0.0:${PORT_DB}/project_db`,
  { useNewUrlParser: true, useUnifiedTopology: false }
).then(()=>{
  console.log(' Success connection to DB ')
  APP.listen(PORT_SERVER, () => {
    console.log('########################')
    console.log('####### API REST  ######')
    console.log('########################')
    console.log(`http://${IP_SERVER}:${PORT_SERVER}/api/${API_VERSION}/`)
  })
}).catch(err => {
  console.dir(err)
})

routerAPI(APP)

APP.use(express.json());

APP.use(logErrors)
APP.use(errorHandler)
