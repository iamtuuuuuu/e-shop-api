const router = require('express-promise-router')()

const productController = require('../controllers/product')

router.route('/')
  .get(productController.getAllProducts)
  .post(productController.newProduct)

module.exports = router  