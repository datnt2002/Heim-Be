import { envConfig } from '../config/envConfig'

export const REFRESH_COOKIES_OPTIONS = {
    maxAge: envConfig.jwt.refreshExpirationDays * 24 * 60 * 60 * 1000, // 7day
    httpOnly: true,
    sameSite: 'lax' as const,
}
export const ACCESS_COOKIES_OPTIONS = {
    maxAge: envConfig.jwt.accessExpirationMinutes * 60 * 1000,
    httpOnly: true,
    sameSite: 'lax' as const,
}

export const ExcludedData = {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
}
