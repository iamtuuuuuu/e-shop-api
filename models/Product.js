const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productShema = new Schema({
  name: {
    type: String,
    required: true
  },
  image: String,
  countInStock: Number
})

module.exports = mongoose.model('Product', productShema)