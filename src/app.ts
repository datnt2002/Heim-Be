import express, { Application, Request, Response } from 'express'
import envConfig from './config/envConfig'
import mongoInit from './libs/mongoInit'
import { Server } from 'http'

export let server: Server
const bootstrap = () => {
    const app: Application = express()

    app.get('/', (_req: Request, res: Response) => {
        res.send('Welcome to application')
    })

    server = app.listen(envConfig.port, () => {
        console.log(`Web app is listening on port ${envConfig.port}`)
    })
}

Promise.all([mongoInit()]).then(() => bootstrap())
