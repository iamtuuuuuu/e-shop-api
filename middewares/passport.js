const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/User')

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

    done(null, user)
  } catch (error) {
    done(error, false)
  }
}))