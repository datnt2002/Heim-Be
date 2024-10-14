import express from 'express'
import { authController } from '../controllers'
import wrapError from '../utils/wrapError'

const userRouter = express.Router()

userRouter.route('/register').post(wrapError(authController.register))

export default userRouter
