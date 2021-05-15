const Joi = require('joi')

const validateBody = (schema) => {
  return (req, res, next) => {
    // console.log(req.body)
    const validatorResult = schema.validate(req.body)

    if (validatorResult.error) {
      // console.log(validatorResult.error)
      res.status(400).json(validatorResult.error)
    } else {
      if (!req.value) req.value = {}
      if (!req.value['params']) req.value.params = {}
      req.value.body = validatorResult.value
      next()
    }
  }
}

const validateParam = (schema, name) => {
  return (req, res, next) => {

    // check
    const validatorResult = schema.validate({
      // vi du idSchema => param la param trong idSchema
      param: req.params[name]
    })

    if (validatorResult.error) {
      res.status(400).json(validatorResult.error)
    } else {
      if (!req.value) req.value = {}
      if (!req.value['params']) req.value.params = {}

      req.value.params[name] = req.params[name]
      next()
    }
  }
}

const schemas = {
  // validate id gui len tren param
  idSchema: Joi.object().keys({
    param: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
  }),

  number: Joi.object().keys({
    param: Joi.number().required()
  }),

  // validate body
  newProductSchema: Joi.object().keys({
    name: Joi.string().min(6).required(),
    description: Joi.string().min(10).required(),
    richDescription: Joi.string(),
    image: Joi.string(),
    images: Joi.array().items(Joi.string()),
    brand: Joi.string(),
    price: Joi.number(),
    category: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
    rating: Joi.number(),
    countInStock: Joi.number().integer().min(0).max(255).required(),
    isFeatured: Joi.boolean(),
    numReviews: Joi.number(),
    dateCreate: Joi.date()
  }).unknown(),
  
  newCategoryShema: Joi.object().keys({
    name: Joi.string().min(6).required(),
    icon: Joi.string(),
    color: Joi.string().regex(/^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/)
  }),

  userSchema: Joi.object().keys({
    name: Joi.string().min(6).required(),
    email: Joi.string().regex(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).required(),
    password: Joi.string().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/).required(),
    authGoogleID: Joi.string(),
    authFacebookID: Joi.string(),
    authType: Joi.string(),
    phone: Joi.string(),
    isAdmin: Joi.boolean(),
    street: Joi.string(),
    apartment: Joi.string(),
    city: Joi.string(),
    zip: Joi.string(),
    country: Joi.string()
  }),

  // auth
  authSignInSchema: Joi.object().keys({
    email: Joi.string().regex(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).required(),
    password: Joi.string().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/).required()
  })
}

module.exports = {
  schemas,
  validateParam, 
  validateBody
}