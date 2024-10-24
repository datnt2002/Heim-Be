import { envConfig } from './../config/envConfig'
import jwt from 'jsonwebtoken'
import moment, { Moment } from 'moment'
import mongoose from 'mongoose'

const generateSession = (
    userId: mongoose.Types.ObjectId,
    expires: Moment,
    type: 'access' | 'refresh',
    secret = envConfig.jwt.secret as string
) => {
    const payload = {
        sub: userId,
        iat: moment().unix(),
        exp: expires.unix(),
        type,
    }
    return jwt.sign(payload, secret)
}

export const generateToken = (userId: mongoose.Types.ObjectId) => {
    const now = moment()
    const accessTokenExpires = moment(now).add(
        envConfig.jwt.accessExpirationMinutes,
        'minutes'
    )

    const accessToken = generateSession(userId, accessTokenExpires, 'access')

    const refreshTokenExpires = moment(now).add(
        envConfig.jwt.refreshExpirationDays,
        'days'
    )

    const refreshToken = generateSession(userId, refreshTokenExpires, 'refresh')
    return { accessToken, refreshToken }
}
