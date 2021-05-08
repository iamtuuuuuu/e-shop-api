const Category = require('../models/Category')

const getAllCategories = async (req, res, next) => {
  const categories = await Category.find({})
  res.status(200).json({categories})
}

const newCategory = async (req, res, next) => {
  const newCategory = new Category({...req.body}) 
  await newCategory.save()
  res.status(201).json({
    categoty: newCategory
  })
}

module.exports = {
  getAllCategories,
  newCategory
}