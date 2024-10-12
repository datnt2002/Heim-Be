export interface IUser {
    name: string
    email: string
    number: number
    avatarUrl?: string
    password: string
}

export type RegisterRequestBody = Omit<IUser, 'avatarUrl'>
