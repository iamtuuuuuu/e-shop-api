const Order = require('../models/Order')
const OrderItem = require('../models/OrderItem')

const getAllOrders = async (req, res, next) => {
  const orders = await Order.find({}).populate('user', 'name phone email').sort({ 'dateOrdered': -1 })

  return res.status(200).json({ data: orders })
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

  // tinh totalPrice
  const totalPrices = Promise.all(orderItemIdsResolved.map(async (orderItemId) => {
    const orderItem = await OrderItem.findById(orderItemId).populate('product', 'price')
    const total = orderItem.product.price * orderItem.quantity
    return total
  }))

  const arrTotalPrice = await totalPrices
  const totalPriceOfProducts = arrTotalPrice.reduce((a, b) => {
    return a + b
  })

  const {
    shippingAddress,
    phone,
    status,
    user
  } = req.value.body

  const newOrder = new Order({
    orderItems: orderItemIdsResolved,
    shippingAddress,
    phone,
    status,
    totalPrice: totalPriceOfProducts,
    user
  })

  await newOrder.save()

  return res.status(200).json({ data: newOrder })
}

const getOrder = async (req, res, next) => {
  const { orderID } = req.value.params
  const order = await Order.findById(orderID)
    .populate('user', 'name phone email')
    .populate({ path: 'orderItems', populate: 'product' })

  return res.status(200).json({ data: order })
}

const updateOrder = async (req, res, next) => {
  const { orderID } = req.value.params
  const newOrder = req.body
  const order = await Order.findByIdAndUpdate(
    orderID,
    newOrder,
    { new: true }
  )
  return res.status(200).json({ data: order })
}

const deleteOrder = async (req, res, next) => {
  const { orderID } = req.value.params

  const order = await Order.findByIdAndRemove(orderID)
  order.orderItems.map(async (item) => {
    await OrderItem.findByIdAndRemove(item)
  })
  return res.status(200).json({ success: true, order })
}

const getTotalSales = async (req, res, next) => {
  const totalSales = await Order.aggregate([
    { $group : { _id : null, totalsales: { $sum: '$totalPrice' } } }
  ])

  return res.status(200).json({totalSales: totalSales.pop().totalsales})
}

const countOrder = async (req, res, next) => {
  const countOrder = await Order.countDocuments((count) => count )
  return res.status(201).json({
    data: countOrder
  })
}

const getOrderOfUser = async (req, res, next) => {
  const { userID } = req.value.params
  const order = await Order.find({user: userID})

  return res.status(200).json({data: order})
}

module.exports = {
  getAllOrders,
  createOrder,
  getOrder,
  updateOrder,
  deleteOrder,
  getTotalSales,
  countOrder,
  getOrderOfUser
}