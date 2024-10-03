import 'dotenv/config'
import { NodeEnvironment } from '../interfaces/common'

const currentEnv = process.env.NODE_ENV as NodeEnvironment

export const envConfig = {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
}

export default { ...envConfig }
