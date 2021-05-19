const Order = require('../models/Order')
const OrderItem = require('../models/OrderItem')

const getAllOrders = async (req, res, next) => {
  const orders = await Order.find({}).populate('user', 'name phone email').sort({ 'dateOrdered': -1 })

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
    shippingAddress2,
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
    shippingAddress2,
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

const getOrder = async (req, res, next) => {
  const { orderID } = req.value.params
  const order = await Order.findById(orderID)
    .populate('user', 'name phone email')
    .populate({ path: 'orderItems', populate: 'product' })

  return res.status(200).json({ order })
}

const updateOrder = async (req, res, next) => {
  const { orderID } = req.value.params
  console.log(orderID)
  const newOrder = req.body
  const order = await Order.findByIdAndUpdate(
    orderID,
    newOrder,
    { new: true }
  )

  return res.status(200).json({order})
}

const deleteOrder = async (req, res, next) => {
  const { orderID } = req.value.params

  const order = await Order.findByIdAndRemove(orderID)
  order.orderItems.map( async (item) => {
    await OrderItem.findByIdAndRemove(item)
  })
  return res.status(200).json({ success: true, order})
}

module.exports = {
  getAllOrders,
  createOrder,
  getOrder,
  updateOrder,
  deleteOrder
}