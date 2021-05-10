const Category = require('../models/Category')

const getAllCategories = async (req, res, next) => {
  const categories = await Category.find({})
  return res.status(200).json({ categories })
}

const newCategory = async (req, res, next) => {
  const newCategory = new Category(req.value.body)
  await newCategory.save()
  return res.status(201).json({
    category: newCategory
  })
}

const getCategory = async (req, res, next) => {
  const {
    categoryID
  } = req.value.params
  const category = await Category.findById(categoryID)
  return res.status(201).json({
    category
  })
}

const updateCategory = async (req, res, next) => {
  const {
    categoryID
  } = req.value.params

  const category = await Category.findByIdAndUpdate(
    categoryID,
    { ...req.value.body },
    { new: true }
  )

  return res.status(201).json({
    category
  })
}

const deleteCategory = async (req, res, next) => {
  await Category.findByIdAndRemove(req.params.id)
  return res.status(200).json({
    success: true,
    message: 'the category is deleted'
  })
}

module.exports = {
  getAllCategories,
  newCategory,
  getCategory,
  updateCategory,
  deleteCategory
}