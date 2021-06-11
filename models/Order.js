const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema({
  orderItems: [{
    type: Schema.Types.ObjectId,
    ref: 'OrderItem',
    required: true
  }],
  shippingAddress: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    default: 'Pending'
  },
  totalPrice: {
    type: Number, 
  }, 
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  dateOrdered: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Order', orderSchema)