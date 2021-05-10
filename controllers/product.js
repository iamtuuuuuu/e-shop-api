const Product = require('../models/Product')
const Category = require('../models/Category')

const getAllProducts = async (req, res, next) => {
  const products = await Product.find({}).populate('category')
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

const getProduct = async (req, res, next) => {
  const {
    productID
  } = req.value.params
  const product = await (await Product.findById(productID)).populate('category')
  return res.status(201).json({
    product
  })
}

const updateProduct = async (req, res, next) => {
  const {
    productID
  } = req.value.params

  const categoryID = req.value.body.category
  const category = await Category.findById(categoryID)
  if (!category) return res.status(400).json({ message: 'Invalid category' })

  const product = await Product.findByIdAndUpdate(
    productID,
    { ...req.value.body },
    { new: true }
  )

  return res.status(201).json({
    product
  })
}

module.exports = {
  getAllProducts,
  newProduct,
  getProduct,
  updateProduct
}