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

router.route('/signin')
  .post(validateBody(schemas.authSignInSchema),
    passport.authenticate(
      'local',
      { session: false }
    ),
    userController.signIn
  )

router.route('/signup')
  .post(validateBody(schemas.authSignUpSchema), userController.signUp)
  
router.route('/secret')  
  .get(passport.authenticate('jwt', {session: false}), userController.secret)   
  
router.route('/:userID')
  .patch(validateParam(schemas.idSchema, 'userID'), validateBody(schemas.userSchemaOption), userController.updateUser)
  .delete(validateParam(schemas.idSchema, 'userID'), userController.deleteUser)
router.route('/profile/:userID')
  .get(validateParam(schemas.idSchema, 'userID'), userController.getUser)  
  .patch(validateParam(schemas.idSchema, 'userID'), validateBody(schemas.userSchema), userController.updateUserProfile)


module.exports = router