import express from 'express'
import { authController } from '../controllers'
import wrapError from '../utils/wrapError'

const userRouter = express.Router()

userRouter.route('/register').post(wrapError(authController.register))
userRouter.route('/login').post(wrapError(authController.login))

export default userRouter
