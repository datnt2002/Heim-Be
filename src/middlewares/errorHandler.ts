import {
    NextFunction,
    Request,
    Response,
    RequestHandler,
    ErrorRequestHandler,
} from 'express'
import { StatusCodes } from 'http-status-codes'
import { Error } from 'mongoose'
import formatResponse from '../utils/formatResponse'
import ApiError from '../utils/APIError'
import { ERROR_MESSAGES } from '../constants/error'

const errorHandler: ErrorRequestHandler = async (
    error: ApiError | Error,
    req: Request,
    res: Response,
    _next: NextFunction
) => {
    console.log(`[ERROR] { ${req.method.toUpperCase()} ${req.originalUrl} }: `)

    console.log(error)

    if (error instanceof Error) {
        res.status(StatusCodes.BAD_REQUEST).json(
            formatResponse(StatusCodes.BAD_REQUEST, true, error.message)
        )
    } else if (error instanceof ApiError) {
        console.log('zo')

        res.status(error.statusCode).json(
            formatResponse(error.statusCode, true, error.message)
        )
    } else {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
            formatResponse(
                StatusCodes.INTERNAL_SERVER_ERROR,
                true,
                ERROR_MESSAGES.INTERNAL_SERVER_ERROR
            )
        )
    }
}

export default (): (RequestHandler | ErrorRequestHandler)[] => {
    const middlewares = []
    middlewares.push(errorHandler)
    return middlewares
}
