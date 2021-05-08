const router = require('express-promise-router')()

const categoryController = require('../controllers/category')

router.route('/')
  .get(categoryController.getAllCategories)
  .post(categoryController.newCategory)

module.exports = router

