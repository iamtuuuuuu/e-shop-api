const expressJwt = require('express-jwt')

function authJwt() {
  const secret = process.env.JWT_SECRET
  return expressJwt({
    secret,
    algorithms: ['HS256'],
    isRevoked: isRevoked
  }).unless({
    path: [
      {url: /\/public\/uploads(.*)/, methods: ['GET', 'OPTIONS']},
      {url: /\products(.*)/, methods: ['GET', 'OPTIONS']},
      {url: /\categories(.*)/, methods: ['GET', 'OPTIONS']},
      '/users/signin',
      '/users/secret'
    ]
  })
}

async function isRevoked(req, payload, done) {
  if(!payload.isAdmin) {
    done(null, true)
  }
  done()
}

module.exports = authJwt