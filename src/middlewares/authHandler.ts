import { NextFunction, Request, Response } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { jwtDecode } from 'jwt-decode'

import ApiError from '../utils/APIError'

const AuthHandler = (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.cookies['x-acc']
    if (!accessToken)
        throw new ApiError(StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED)
    const decodeToken = jwtDecode(accessToken)
    console.log(decodeToken)
    const now = new Date()
}

export default AuthHandler
