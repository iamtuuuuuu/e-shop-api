const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderItemSchema = new Schema({
  quantity: {
    type: Number,
    require: true
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product'
  }
})

module.exports = mongoose.model('OrderItem', orderItemSchema)
