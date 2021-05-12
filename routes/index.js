const productRoute = require('./product')
const categoryRoute = require('./category')
const userRoute = require('./user')


const route = (app) => {
  app.use('/products', productRoute) 
  app.use('/categories', categoryRoute) 
  app.use('/users', userRoute) 
}

module.exports = route;
