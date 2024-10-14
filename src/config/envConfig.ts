import 'dotenv/config'
import { NodeEnvironment } from '../interfaces/common'

const currentEnv = process.env.NODE_ENV as NodeEnvironment

export const envConfig = {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    db: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        dbName: process.env.DB_NAME,
    },
}

export const mongoConnection = {
    local: process.env.LOCAL_DB_CONNECTION,
    development: '',
    staging: '',
    production: '',
}[currentEnv]
