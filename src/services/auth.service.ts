import { findByUsernameOrEmail } from './../repository/repository'
import { ERROR_MESSAGES } from '../constants/error'
import ApiError from '../utils/APIError'
import userModel from '../models/user.model'
import {
    IUser,
    LoginRequestBody,
    RegisterRequestBody,
} from '../types/user.type'
import { StatusCodes } from 'http-status-codes'
import { compareSync } from 'bcrypt'
import { generateToken } from '../utils/jwtUtils'

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

export { createUser, login }
