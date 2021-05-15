const User = require('../models/User')
const jwt = require('jsonwebtoken')
const encodedToken = (id) => {
  return jwt.sign({
    iss: 'Tu',
    sub: id,
    iat: new Date().getTime(),
    exp: new Date().setDate(new Date().getDate() + 3)
  }, process.env.JWT_SECRET)
}


const getUsers = async (req, res, next) => {
  const users = await User.find({}).select('name phone email') // chi show name phone email

  return res.status(201).json({
    users
  })
}

const newUser = async (req, res, next) => {
  const newUser = new User(req.value.body)
  await newUser.save()
  return res.status(201).json({
    newUser
  })
}

const getUser = async (req, res, next) => {
  const { userID } = req.value.params

  const user = await User.find({_id: userID}).select('-password') // ko show password

  return res.status(200).json({
    user
  })

}

const signIn = async (req, res, next) => {
  console.log(process.env.JWT_SECRET)
  const user = await User.findOne({_id: req.user._id})
  const token = encodedToken(user._id)
  res.setHeader('Authorization', token)

  return res.status(200).json({user, token})
}

module.exports = {
  getUsers,
  newUser,
  getUser,
  signIn
}