const Product = require('../models/Product')
const Category = require('../models/Category')

const getAllProducts = async (req, res, next) => {
  const products = await Product.find({})
  return res.status(200).json({
    products
  })
}

const newProduct = async (req, res, next) => {
  //check categoryID
  const categoryID = req.value.body.category
  const category = await Category.findById(categoryID)
  if (!category) return res.status(400).json({ message: 'Invalid category' })

  const newProduct = new Product(req.value.body)
  await newProduct.save()

  return res.status(201).json({
    product: newProduct
  })

}

module.exports = {
  getAllProducts,
  newProduct
}