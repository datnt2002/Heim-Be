import mongoose from 'mongoose'
import HTTPException from '../utils/HTTPException'
import { StatusCodes } from 'http-status-codes'
import { JsonWebTokenError } from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'

const ExceptionParser = async (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    if (!(error instanceof HTTPException)) {
        console.log('ExceptionParser: Unhandled error', error)
        const errorValidate = error instanceof mongoose.Error.ValidationError
        const statusCode = errorValidate
            ? StatusCodes.BAD_REQUEST
            : error instanceof JsonWebTokenError
              ? StatusCodes.UNAUTHORIZED
              : StatusCodes.INTERNAL_SERVER_ERROR

        let message: string

        if (errorValidate) {
            //TODO
            const errorsList = Object.entries(error.errors).flat()
            // message = errorsList.map((err) => err)
        }
    }
}

export default ExceptionParser
