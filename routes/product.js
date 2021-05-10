const router = require('express-promise-router')()

const productController = require('../controllers/product')
const {
  schemas,
  validateParam, 
  validateBody
} = require('../helpers/routerHelper')

router.route('/')
  .get(productController.getAllProducts)
  .post( validateBody(schemas.newProductSchema), productController.newProduct)

module.exports = router  