const productRoute = require('./product')
const categoryRoute = require('./category')


const route = (app) => {
  app.use('/products', productRoute) 
  app.use('/categories', categoryRoute) 
}

module.exports = route;
