const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema({
  orderItems: [{
    type: Schema.Types.ObjectId,
    ref: 'OrderItem',
    required: true
  }],
  shippingAddress1: {
    type: String,
    required: true
  },
  shippingAddress2: {
    type: String
  },
  city: {
    type: String,
    required: true
  },
  zip: {
    type: String,
    required: true    
  },
  country: {
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
    required: true
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