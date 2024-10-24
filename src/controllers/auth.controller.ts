import { Request, Response } from 'express'
import { authService } from '../services'
import { StatusCodes } from 'http-status-codes'
import formatResponse from '../utils/formatResponse'
import { RESPONSE_MESSAGES } from '../constants/responseMessage'
import {
    ACCESS_COOKIES_OPTIONS,
    REFRESH_COOKIES_OPTIONS,
} from '../constants/auth'

const register = async (req: Request, res: Response) => {
    const data = await authService.createUser(req.body)

    res.status(StatusCodes.CREATED).json(
        formatResponse(
            StatusCodes.CREATED,
            false,
            RESPONSE_MESSAGES.REGISTER_SUCCESSFULLY,
            data
        )
    )
}

const login = async (req: Request, res: Response) => {
    const data = await authService.login(req.body)

    res.status(StatusCodes.OK)
        .cookie('x-acc', data.accessToken, ACCESS_COOKIES_OPTIONS)
        .cookie('x-ref', data.refreshToken, REFRESH_COOKIES_OPTIONS)
        .json(
            formatResponse(
                StatusCodes.CREATED,
                false,
                RESPONSE_MESSAGES.LOGIN_SUCCESSFULLY,
                data.user
            )
        )
}

export { register, login }
