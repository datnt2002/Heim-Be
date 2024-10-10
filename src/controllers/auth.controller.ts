import { Request, Response } from 'express'
import { authService } from '../services'

const register = async (req: Request, res: Response) => {
    const data = await authService.createUser(req.body)
}

export { register }
