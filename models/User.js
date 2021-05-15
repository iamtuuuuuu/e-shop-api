const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')
const Schema = mongoose.Schema

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  authGoogleID: {
    type: String,
    default: null
  },
  authFacebookID: {
    type: String,
    default: null
  },
  authType: {
    type: String,
    enum: ['local', 'google', 'facebook'],
    default: 'local'
  },
  phone: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  street: {
    type: String,
    default: ''
  },
  apartment: {
    type: String,
    default: ''
  },
  city: {
    type: String,
    default: ''
  },
  zip: {
    type: String,
    default: ''
  },
  country: {
    type: String,
    default: ''
  }
})

// Xu li trc khi luu user
userSchema.pre('save', async function (next) {
  try {
    // neu login bang google, fb
    if (this.authType !== 'local') {
      next()
    } else {
      // Generate a salt
      const salt = await bcryptjs.genSalt(10)
      // Generate a password hash
      const passwordHashed = await bcryptjs.hash(this.password, salt)
      // Re-assign password
      this.password = passwordHashed
      next()
    }
  } catch (error) {
    console.log(error)
    next(error)
  }
})

userSchema.methods.isValidPassword = async function (newPassword) {
  try {
    // compare => return true|| false
    return await bcryptjs.compare(newPassword, this.password)
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = mongoose.model('User', userSchema)