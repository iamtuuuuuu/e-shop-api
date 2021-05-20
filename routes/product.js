const router = require('express-promise-router')()
const multer = require('multer')

const productController = require('../controllers/product')
const {
  schemas,
  validateParam, 
  validateBody
} = require('../helpers/routerHelper')

const upload = require('../helpers/uploadHelper')

router.route('/')
  .get(productController.getProducts)
  .post(upload.single('image'),  validateBody(schemas.newProductSchema), productController.newProduct)

router.route('/:productID')  
  .get( validateParam(schemas.idSchema, 'productID'), productController.getProduct)
  .put( validateParam(schemas.idSchema, 'productID'), validateBody(schemas.newProductSchema), productController.updateProduct)
  .delete( validateParam(schemas.idSchema, 'productID'), productController.deleteProduct)

router.route('/get/count')
  .get(productController.countProduct)

router.route('/get/featured/:count')  
  .get( validateParam(schemas.number, 'count') , productController.getFeatureProduct)
module.exports = router  