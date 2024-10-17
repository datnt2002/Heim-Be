import express, { RequestHandler } from 'express'
import cors from 'cors'

const requestHandler = (): RequestHandler[] => {
    const middlewares: RequestHandler[] = []
    middlewares.push(express.json())
    middlewares.push(express.urlencoded({ extended: true }))
    middlewares.push(
        cors({
            origin: '*',
            credentials: true,
        })
    )

    return middlewares
}

export default requestHandler
