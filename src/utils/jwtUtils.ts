import jwt from 'jsonwebtoken'

export const generateToken = (username: string) => {
    return jwt.sign(
        {
            exp: Math.floor(Date.now() / 1000) + 60 * 60,
            data: username,
        },
        'secret'
    )
}
