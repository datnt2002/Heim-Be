import { NextFunction, Request, Response } from 'express'
import { Schema } from 'zod'

const validateHandler =
    (schema: Schema) => (req: Request, _res: Response, next: NextFunction) => {
        schema.parse(req.body)
        next()
    }

export default validateHandler
