import express from 'express'
import { authController } from '../controllers'
import wrapError from '../utils/wrapError'
import validate from '../middlewares/validateHandler'
import { register } from '../validations/auth.validation'

const userRouter = express.Router()

userRouter
    .route('/register')
    .post(validate(register), wrapError(authController.register))
userRouter.route('/login').post(wrapError(authController.login))

export default userRouter
