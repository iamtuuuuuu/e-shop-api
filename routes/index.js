const productRoute = require('./product')


const route = (app) => {
  app.use('/products', productRoute) 
}

module.exports = route;
