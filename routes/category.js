const router = require('express-promise-router')()

const categoryController = require('../controllers/category')
const {
  schema,
  validateParam, 
  validateBody
} = require('../helpers/routerHelper')

router.route('/')
  .get(categoryController.getAllCategories)
  .post(categoryController.newCategory)

router.route('/:id') 
  .get(validateParam(schema.idSchema, 'categoryID'), categoryController.getCategory)
  .put(validateParam(schema.idSchema, 'categoryID'), categoryController.updateCategory)
  .delete(validateParam(schema.idSchema, 'categoryID'), categoryController.deleteCategory)

module.exports = router

