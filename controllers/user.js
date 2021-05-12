const User = require('../models/User')

const getUsers = async (req, res, next) => {
  const users = await User.find({})

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

module.exports = {
  getUsers,
  newUser
}