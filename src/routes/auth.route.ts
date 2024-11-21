import express from 'express'
import { authController } from '../controllers'
import wrapError from '../utils/wrapError'
import validate from '../middlewares/validateHandler'
import { login, register } from '../validations/auth.validation'
import AuthHandler from '../middlewares/authHandler'

const userRouter = express.Router()

userRouter
    .route('/register')
    .post(validate(register), wrapError(authController.register))
userRouter
    .route('/login')
    .post(validate(login), wrapError(authController.login))
userRouter
    .route('/profile')
    .get(AuthHandler, wrapError(authController.getMyProfile))

export default userRouter
