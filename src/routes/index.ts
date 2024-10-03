import express from 'express'
import envConfig from '../config/envConfig'
import { default as docsRoute } from './doc.route'
import { default as authRoute } from './auth.route'
const router = express.Router()

const defaultRoutes = [
    {
        path: '/auth',
        route: authRoute,
    },
]

const devRoutes = [
    // routes available only in development mode
    {
        path: '/docs',
        route: docsRoute,
    },
]

defaultRoutes.forEach((route) => router.use(route.path, route.route))

if (envConfig.env !== 'production') {
    devRoutes.forEach((route) => router.use(route.path, route.route))
}

export default router
