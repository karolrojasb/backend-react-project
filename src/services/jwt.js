const jwt = require('jwt-simple')
const moment = require('moment')
const SECRET_KEY = "password-software-II"

/** Función para crear el token de acceso */

exports.createAccessWithToken = (user) => {
  const payLoad = {
    id: user._id,
    name: user.name,
    lastname: user.lastname,
    email: user.email,
    role: user.role,
    createToken: moment().unix(),
    expiration_date: moment().add(12, 'hours').unix()
  }
  return jwt.encode(payLoad, SECRET_KEY)
}

exports.createRefreshToken = (user) => {
  const payload = {
    id: user._id,
    expiration_date: moment().add(30, 'days').unix()
  }
  return jwt.encode(payload, SECRET_KEY)
}

/* Función que descodifica cualquier de los dos tokens */

exports.decodedToken = (token) => {
  return jwt.decode(token, SECRET_KEY, true)
}
