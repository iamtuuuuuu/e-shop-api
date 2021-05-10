const router = require('express-promise-router')()

const categoryController = require('../controllers/category')
const {
  schemas,
  validateParam, 
  validateBody
} = require('../helpers/routerHelper')

router.route('/')
  .get(categoryController.getAllCategories)
  .post(categoryController.newCategory)

router.route('/:id') 
  .get(validateParam(schemas.idSchema, 'categoryID'), categoryController.getCategory)
  .put(validateParam(schemas.idSchema, 'categoryID'), categoryController.updateCategory)
  .delete(validateParam(schemas.idSchema, 'categoryID'), categoryController.deleteCategory)

module.exports = router

