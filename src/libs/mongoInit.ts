import mongoose from 'mongoose'
import envConfig from '../config/envConfig'

export default async function () {
    mongoose.connect(envConfig.mongoConnection as string, {
        dbName: envConfig.db.dbName,
    })

    const connection = mongoose.connection

    connection.on('error', console.error.bind(console, 'MongoDB error: '))
    connection.once('open', () => console.log('Mongo connected successfully'))
}