const expressJwt = require('express-jwt')

function authJwt() {
  const secret = process.env.JWT_SECRET
  console.log(secret)
  return expressJwt({
    secret,
    algorithms: ['HS256']
  }).unless({
    path: [
      '/users/signin',
      '/users/secret'
    ]
  })
}

module.exports = authJwt