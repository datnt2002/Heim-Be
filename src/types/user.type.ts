export interface IUser {
    username: string
    name: string
    email: string
    number: number
    avatarUrl?: string
    password: string
}

export type RegisterRequestBody = Omit<IUser, 'avatarUrl'>

export type LoginRequestBody = Pick<IUser, 'password'> & { principle: string }
