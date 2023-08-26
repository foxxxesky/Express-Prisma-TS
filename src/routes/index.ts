import express from 'express'

import admin from './admin'
import user from './user'
import authentication from './authentication'

const router = express.Router()

export default(): express.Router => {
    authentication(router)
    admin(router)
    user(router)

    return router
}
