const Order = require('../models/Order')
const OrderItem = require('../models/OrderItem')

const getAllOrders = async (req, res, next) => {
  const orders = await Order.find({})

  return res.status(200).json({ orders })
}

const createOrder = async (req, res, next) => {
  const orderItemIds = Promise.all(req.value.body.orderItems.map(async item => {
    const newOrderItem = new OrderItem({
      quantity: item.quantity,
      product: item.product
    })

    await newOrderItem.save()
    return newOrderItem._id
  }))

  const orderItemIdsResolved = await orderItemIds

  const {
    shippingAddress1,
    shippingAdress2,
    city,
    zip,
    country,
    phone,
    status,
    totalPrice,
    user
  } = req.value.body

  const newOrder = new Order({
    orderItems: orderItemIdsResolved,
    shippingAddress1,
    shippingAdress2,
    city,
    zip,
    country,
    phone,
    status,
    totalPrice,
    user
  })

  await newOrder.save()

  return res.status(200).json({ order: newOrder })
}

module.exports = {
  getAllOrders,
  createOrder
}