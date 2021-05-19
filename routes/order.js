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

router.route('/:orderID')  
  .get(validateParam(schemas.idSchema, 'orderID'), orderController.getOrder)
  .patch( validateParam(schemas.idSchema, 'orderID'),  orderController.updateOrder)
  .delete( validateParam(schemas.idSchema, 'orderID'), orderController.deleteOrder)
module.exports = router