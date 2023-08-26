import express from 'express'

import { deleteUser, editUser, getAllUsers } from '../controllers/adminController'
import { isAdmin } from '../middleware'

export default (router: express.Router) => {
    router.get('/admin/users', isAdmin, getAllUsers)
    router.patch('/admin/user', isAdmin, editUser)
    router.delete('/admin/user', isAdmin, deleteUser)
}
