import express, { Application, Request, Response } from 'express'
import { Server } from 'http'

import mongoInit from './libs/mongoInit'
import router from './routes'
import { envConfig } from './config/envConfig'
import errorHandler from './middlewares/errorHandler'

export let server: Server
const bootstrap = () => {
    const app: Application = express()
    app.use(express.json())

    app.get('/', (_req: Request, res: Response) => {
        res.send('Welcome to application')
    })

    app.use('/v1', router)

    app.use(errorHandler())
    server = app.listen(envConfig.port, () => {
        console.log(`Web app is listening on port ${envConfig.port}`)
    })
}

Promise.all([mongoInit()]).then(() => bootstrap())
