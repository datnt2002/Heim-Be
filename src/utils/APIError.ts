export default class ApiError extends Error {
    isError: boolean
    statusCode: number

    constructor(statusCode: number, message: string) {
        super(message)
        this.isError = true
        this.statusCode = statusCode
    }
}
