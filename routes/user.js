const router = require('express-promise-router')()

const userController = require('../controllers/user')

const {
  schemas,
  validateParam,
  validateBody
} = require('../helpers/routerHelper')

const passport = require('passport')
const passportConfig = require('../middewares/passport')

router.route('/')
  .get(userController.getUsers)
  .post(validateBody(schemas.userSchema), userController.newUser)

router.route('/:userID')
  .get(validateParam(schemas.idSchema, 'userID'), userController.getUser)

router.route('/signin')
  .post(validateBody(schemas.authSignInSchema),
    passport.authenticate(
      'local',
      { session: false }
    ),
    userController.signIn
  )
module.exports = router