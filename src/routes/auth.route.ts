import express from 'express'
import { authController } from '../controllers'

const userRouter = express.Router()

userRouter.route('/register').post(authController.register)

export default userRouter
