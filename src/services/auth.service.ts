import { findByUsernameOrEmail } from './../repository/repository'
import { ERROR_MESSAGES } from '../constants/error'
import ApiError from '../utils/APIError'
import userModel from '../models/user.model'
import {
    IUser,
    LoginRequestBody,
    RegisterRequestBody,
} from '../types/user.type'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { compareSync } from 'bcrypt'
import { generateToken } from '../utils/jwtUtils'
import mongoose from 'mongoose'

const excludeSensitiveFields = (user: IUser) => {
    const { password, ...userWithoutSensitiveFields } = user
    return userWithoutSensitiveFields
}

const createUser = async (body: RegisterRequestBody) => {
    const { email, username } = body
    const user = await findByUsernameOrEmail(username, email)

    if (user) {
        throw new ApiError(
            StatusCodes.CONFLICT,
            ERROR_MESSAGES.USER_ALREADY_EXISTS
        )
    }

    const result = await userModel.create({
        ...body,
    })

    return { user: excludeSensitiveFields(result) }
}

const login = async (body: LoginRequestBody) => {
    const { principle, password } = body
    const user = await findByUsernameOrEmail(principle, principle)

    if (!user || !compareSync(password, user.password))
        throw new ApiError(
            StatusCodes.BAD_REQUEST,
            ERROR_MESSAGES.WRONG_USERNAME_OR_EMAIL
        )

    const token = generateToken(user._id)

    return { user: excludeSensitiveFields(user), ...token }
}

const getMyProfile = async (userId?: mongoose.Types.ObjectId) => {
    if (!userId)
        throw new ApiError(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST)
    const userProfile = await userModel.findById(userId)

    if (!userProfile) {
        throw new ApiError(StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED)
    }

    return userProfile
}

export { createUser, login, getMyProfile }
