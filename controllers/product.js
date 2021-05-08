const Product = require('../models/Product')

const getAllProducts = async (req, res, next) => {
  const products = await Product.find({})
  return res.status(200).json({
    products
  })
}

const newProduct = async (req, res, next) => {
  const formProduct = {...req.body}
  const newProduct = new Product(formProduct)
  console.log(newProduct)
  await newProduct.save()
  return res.status(201).json({
    product: newProduct
  })

}

module.exports = {
  getAllProducts,
  newProduct
}