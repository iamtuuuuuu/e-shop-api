const router = require('express-promise-router')()

const categoryController = require('../controllers/category')
const {
  schemas,
  validateParam, 
  validateBody
} = require('../helpers/routerHelper')

router.route('/')
  .get(categoryController.getAllCategories)
  .post( validateBody(schemas.newCategoryShema), categoryController.newCategory)

router.route('/:categoryID') 
  .get(validateParam(schemas.idSchema, 'categoryID'), categoryController.getCategory)
  .put(validateParam(schemas.idSchema, 'categoryID'), validateBody(schemas.newCategoryShema), categoryController.updateCategory)
  .delete(validateParam(schemas.idSchema, 'categoryID'), categoryController.deleteCategory)

module.exports = router

