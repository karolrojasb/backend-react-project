const Service = require('../services/user.service')
const user_model = require('../models/user.model')
const user_service = new Service()

exports.createUser = (req,res, next) =>{
  new_user = user_model(req.body)
  user_service.createUser(new_user).then((data)=>{
    res.status(201).json(data)
  }).catch((err)=>{
    next(err)
  })
}
