const Product = require('../models/Product')
const Category = require('../models/Category')

// /products?categories=60964c61232edc17c9da952b
const getProducts = async (req, res, next) => {
  let filter = {}
  if(req.query.categories) {
    filter = {category: req.query.categories.split(',')}
  }
  console.log(filter)
  const products = await Product.find(filter).populate('category')
  return res.status(200).json({
    products
  })
}

const newProduct = async (req, res, next) => {
  //check categoryID
  const {
    name, 
    description,
    richDescription,
    brand,
    price,
    category,
    countInStock,
    rating,
    numReviews,
    isFeatured
  } = req.value.body
  console.log(req.value.body)
  
  const category1 = await Category.findById(category)
  if (!category1) return res.status(400).json({ message: 'Invalid category' })

  const fileName = req.file.filename
  const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`

  
  const newProduct = new Product({
    name, 
    description,
    richDescription,
    image: `${basePath}${fileName}`,
    brand,
    price,
    category,
    countInStock,
    rating,
    numReviews,
    isFeatured
  })
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

const deleteProduct = async (req, res, next) => {
  const {
    productID
  } = req.value.params
  await Product.findByIdAndRemove(productID)
  return res.status(200).json({
    success: true,
    message: 'the product is deleted'
  })
}

const countProduct = async (req, res, next) => {
  const productCount = await Product.countDocuments((count) => count)

  return res.status(201).json({
    productCount
  })
}

const getFeatureProduct = async (req, res, next) => {
  const {
    count 
  } = req.value.params
  const featureProducts = await Product.find({isFeatured: true}).limit(+count)

  if(!featureProducts) {
    res.status(500).json({success: false})
  }

  return res.status(201).json({
    featureProducts
  })
}

module.exports = {
  getProducts,
  newProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  countProduct,
  getFeatureProduct
}