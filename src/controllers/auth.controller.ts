import { Request, Response } from 'express'
import { authService } from '../services'
import { StatusCodes } from 'http-status-codes'
import formatResponse from '../utils/formatResponse'
import { RESPONSE_MESSAGES } from '../constants/responseMessage'

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
    const data = await authService.createUser(req.body)

    res.status(StatusCodes.OK).json(
        formatResponse(
            StatusCodes.CREATED,
            false,
            RESPONSE_MESSAGES.LOGIN_SUCCESSFULLY,
            data
        )
    )
}

export { register, login }
