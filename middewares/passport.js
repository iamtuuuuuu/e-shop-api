const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const LocalStrategy = require('passport-local').Strategy

const ExtractJwt = require('passport-jwt').ExtractJwt
const User = require('../models/User')
const {
  JWT_SECRET,
  auth
} = require('../configs')

// passport - local
passport.use(new LocalStrategy({
  usernameField: 'email'
}, async (email, password, done) => {
  try {
    const user = await User.findOne({
      email
    })
    if (!user) return done(null, false)

    const isCorrectPassword = await user.isValidPassword(password)

    if (!isCorrectPassword) return done(null, false)
    console.log(user)

    return done(null, user)
  } catch (error) {
    done(error, false)
  }
}))

// passport jwt
passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('Authorization'),
  secretOrKey: 'day-la-secret-key'
}, async function (jwt_payload, done) {
  try {
    console.log(JWT_SECRET)
    const user = await User.findById(jwt_payload.sub)
    if (!user) {
      return done(null, false)
    }
    done(null, user)
  } catch (error) {
    done(error, false)
  }
}));