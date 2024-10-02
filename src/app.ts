import express, { Application, Request, Response } from 'express'
import envConfig from './config/envConfig'


const app: Application = express()

app.get('/', (_req: Request, res: Response) => {
    res.send('Welcome to application')
  })

app.listen(envConfig.port, () => {
    console.log(`Web app is listening on port ${envConfig.port}`);
})