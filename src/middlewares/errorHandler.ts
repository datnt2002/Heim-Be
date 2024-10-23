import { NextFunction, Request, Response, ErrorRequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'
import { Error } from 'mongoose'
import formatResponse from '../utils/formatResponse'
import ApiError from '../utils/APIError'
import { ERROR_MESSAGES } from '../constants/error'
import { ZodError } from 'zod'

const errorHandler: ErrorRequestHandler = async (
    error: ApiError | Error | ZodError,
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
        return
    }
    if (error instanceof ApiError) {
        res.status(error.statusCode).json(
            formatResponse(error.statusCode, true, error.message)
        )
        return
    }
    if (error instanceof ZodError) {
        res.status(StatusCodes.BAD_REQUEST).json(
            formatResponse(
                StatusCodes.BAD_REQUEST,
                true,
                error.issues[0].message
            )
        )
        return
    }

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
        formatResponse(
            StatusCodes.INTERNAL_SERVER_ERROR,
            true,
            ERROR_MESSAGES.INTERNAL_SERVER_ERROR
        )
    )
}

export default errorHandler
