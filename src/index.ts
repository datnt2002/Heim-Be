import { server } from './app'

const unexpectedErrorHandler = () => {
    if (server) {
        server.close(() => process.exit(1))
        return
    }
    process.exit(1)
}

process.on('uncaughtException', unexpectedErrorHandler)
process.on('unhandledRejection', unexpectedErrorHandler)
process.on('SIGTERM', () => {
    if (server) server.close()
})
