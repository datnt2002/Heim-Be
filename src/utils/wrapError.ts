import { NextFunction, Request, Response } from 'express'

type RequestHandler<T> = (
    req: Request,
    res: Response,
    next: NextFunction
) => Promise<T>

type ErrorRequestHandler<T> = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => Promise<T>

type ErrorMiddleware<T> = RequestHandler<T> | ErrorRequestHandler<T>

function wrapError<T>(controller: ErrorMiddleware<T>): ErrorMiddleware<T> {
    if (controller.length <= 3) {
        return function (req: Request, res: Response, next: NextFunction) {
            return (controller as RequestHandler<T>)(req, res, next).catch(next)
        } as RequestHandler<T>
    }

    return function (
        err: Error,
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        return (controller as ErrorRequestHandler<T>)(
            err,
            req,
            res,
            next
        ).catch(next)
    } as ErrorRequestHandler<T>
}

export default wrapError
