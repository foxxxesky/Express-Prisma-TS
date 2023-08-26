import express from 'express'

import { getProfile, updateProfile } from '../controllers/userController'
import { isAuthenticated } from '../middleware'

export default (router: express.Router) => {
    router.get('/user', isAuthenticated, getProfile)
    router.patch('/user', isAuthenticated, updateProfile)
}
