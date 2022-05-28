const bcrypt = require("bcrypt-nodejs")
const Service = require('../services/user.service')
const user_model = require('../models/user.model')
const UserService = require("../services/user.service")
const user_service = new Service()
const jwt = require('../services/jwt')

exports.createUser = (req,res, next) =>{
  new_user = user_model(req.body)
  user_service.createUser(new_user).then((data)=>{
    res.status(201).json(data)
  }).catch((err)=>{
    next(err)
  })
}

exports.signUp = (req, res) => {
  const user = new user_model();
  const { email, password, repeatedPassword } = req.body
  user.email = email
  user.role = 'admin'
  user.active = true
  if (!password || !repeatedPassword){
    res.status(404).send({ message: 'Las contraseñas son obligatorias' })
  } else {
    if (password !== repeatedPassword){
      res.status(404).send({ message: 'Las contraseñas no coinciden' })
    } else {
      bcrypt.hash(password, null, null, (err, hash) => {
        if (err) {
          res.status(500).send({ message: "Error al encriptar la contraseña" })
        } else {
          user.password = hash
          user.save((err, userStored) => {
            if (err) {
              res.status(500).send({ message: 'El usuario ya existe' })
            } else {
              if (!userStored) {
                res.status(404).send({ message: 'Error al crear el usuario'})
              } else {
                res.status(200).send({ user: userStored })
              }
            }
          })
        }
      })
    }
  }
}

exports.signIn = (req, res) => {
  console.log('login correcto')
  const params = req.body
  const email = params.email.toLowerCase()
  const password = params.password
  UserService.findOne({ email }, (err, userStored) => {
    if (err) {
      res.status(500).send({ message: "Error del servidor "})
    } else {
      if (!userStored) {
        res.status(404).send({ message: 'Usuario no encontrado' })
      } else {
        bcrypt.compare(password, userStored.password, (err, check) => {
          if (err) {
            res.status(500).send({ message: 'Error del servidor' })
          } else if (!check) {
            res.status(404).send({ message: 'La contraseña es incorrecta' })
          } else {
            if (!userStored.active) {
              res.status(200).send({ code: 200, message: "El usuario no se ha activado" })
            } else {
              res.status(200).send({
                accessToken: jwt.createAccessWithToken(userStored),
                refreshToken: jwt.createRefreshToken(userStored)
              })
            }
          }
        })
      }
    }
  })
}
