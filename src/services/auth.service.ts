import { ERROR_MESSAGES } from '../constants/error'
import ApiError from '../utils/APIError'
import userModel from '../models/user.model'
import { RegisterRequestBody } from '../types/user.type'
import { StatusCodes } from 'http-status-codes'

const createUser = async (body: RegisterRequestBody) => {
    const { email } = body
    const user = await userModel.findOne({ email })

    if (user) {
        console.log('ahah')

        throw new ApiError(
            StatusCodes.CONFLICT,
            ERROR_MESSAGES.USER_ALREADY_EXISTS
        )
    }

    const result = await userModel.create({
        ...body,
        name: 'John',
        number: '0123',
    })

    return result
}

export { createUser }
