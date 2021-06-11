const User = require('../models/User')
const bcryptjs = require('bcryptjs')

const getUsers = async (req, res, next) => {
  const users = await User.find({}).select('name phone email isAdmin') // chi show name phone email

  return res.status(201).json({
    data: users
  })
}

const newUser = async (req, res, next) => {
  const newUser = new User(req.value.body)
  await newUser.save()
  return res.status(201).json({
    data: newUser.toObject()
  })
}

const getUser = async (req, res, next) => {
  const { userID } = req.value.params

  const user = await User.findOne({_id: userID}).select('-password') // ko show password
console.log(user)
  return res.status(200).json({
    data: user
  })

}

const signIn = async (req, res, next) => {
  const user = await User.findOne({_id: req.user._id})
  return res.status(200).json({
    data: user.toObject()
  })
}

const signUp = async (req, res, next) => {
  const {name, email, password, phone } = req.value.body

  // check user same email
  const foundUser = await User.findOne({email})
  if(foundUser) return res.status(403).json({
    error: {
      message: 'Email is already in use'
    }
  })

  // Create new user
  const newUser = new User({name, email, password, phone})
  await newUser.save()
  
  return res.status(201).json({
    data: newUser.toObject()
  })
}

const updateUserProfile = async (req, res, next) => {
  const {userID} = req.value.params
  const newUser = req.body
  // Generate a salt
  const salt = await bcryptjs.genSalt(10)
  // Generate a password hash
  const passwordHashed = await bcryptjs.hash(newUser.password, salt)
  // Re-assign password
  newUser.password = passwordHashed
  const user = await User.findByIdAndUpdate(
    userID,
    newUser,
    { new: true }
  ).select('-password')
  console.log(user)
  return res.status(200).json({ data: user.toObject() })

}

const updateUser = async (req, res, next) => {
  const { userID } = req.value.params
  const newUser = req.body
  const user = await User.findByIdAndUpdate(
    userID,
    newUser,
    { new: true }
  ).select('-password')
  console.log(user)
  return res.status(200).json({ data: user.toObject() })
}

const deleteUser = async (req, res, next) => {
  const { userID } = req.value.params
  await User.findByIdAndRemove(userID)
  return res.status(200).json({
    success: true,
    message: 'user was deleted'
  })
}

const secret = async (req, res, next) => {
  res.status(200).json({resources: true})
}

module.exports = {
  getUsers,
  newUser,
  getUser,
  signIn,
  signUp,
  secret,
  updateUserProfile,
  updateUser,
  deleteUser

}