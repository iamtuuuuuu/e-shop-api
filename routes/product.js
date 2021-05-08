const router = require('express-promise-router')()

const productController = require('../controllers/product')
const {
  schema,
  validateParam, 
  validateBody
} = require('../helpers/routerHelper')

router.route('/')
  .get(productController.getAllProducts)
  .post( validateBody(schema.newProductSchema), productController.newProduct)

module.exports = router  