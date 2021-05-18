const router = require('express-promise-router')()
const orderController = require('../controllers/order')
const {
  schemas,
  validateParam, 
  validateBody
} = require('../helpers/routerHelper')

router.route('/')
  .get(orderController.getAllOrders)
  .post( validateBody(schemas.orderSchema), orderController.createOrder)

module.exports = router