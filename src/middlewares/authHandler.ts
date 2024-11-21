import { NextFunction, Request, Response } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { jwtDecode } from 'jwt-decode'

import ApiError from '../utils/APIError'
import { ERROR_MESSAGES } from '../constants/error'
import { CustomJwtPayload } from '../utils/jwtUtils'

const AuthHandler = (req: Request, _res: Response, _next: NextFunction) => {
    const accessToken = req.cookies['x-acc']
    if (!accessToken)
        throw new ApiError(StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED)
    const decodeToken = jwtDecode<CustomJwtPayload>(accessToken)

    const now = new Date()
    console.log(decodeToken)

    if (decodeToken.type === 'refresh') {
        throw new ApiError(StatusCodes.UNAUTHORIZED, ReasonPhrases.FORBIDDEN)
    }

    const tokenExpirationTime = new Date((decodeToken.exp ?? 0) * 1000)

    if (tokenExpirationTime < now) {
        throw new ApiError(
            StatusCodes.UNAUTHORIZED,
            ERROR_MESSAGES.TOKEN_EXPIRED
        )
    } else {
        req.userId = decodeToken.userId
    }
}
export default AuthHandler
