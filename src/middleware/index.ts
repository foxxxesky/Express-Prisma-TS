import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import { get, merge } from 'lodash'

import prisma from '../db/prisma'

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const sessionToken = req.cookies['auth_token']
        
        if (!sessionToken) {
            throw new Error('Not authenticated')
        }

        const decoded = jwt.verify(sessionToken, process.env.JWT_SECRET)

        const existingUser = await prisma.user.findUnique({ where: { id: get(decoded, 'userId')} })

        if (!existingUser) {
            throw new Error('Not authenticated')
        }

        merge(req, { user: existingUser })

        return next()

    } catch (error) {
        return res.status(401).json({
            success: false,
            error: error.message,
        })
    }
}

export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const sessionToken = req.cookies['auth_token']
        
        if (!sessionToken) {
            throw new Error('Not authenticated')
        }

        const decoded = jwt.verify(sessionToken, process.env.JWT_SECRET)

        const existingUser = await prisma.user.findUnique({ where: { id: get(decoded, 'userId')} })

        if (!existingUser) {
            throw new Error('Not authenticated')
        }

        if (existingUser.role !== 'Admin') {
            throw new Error('Not authorized')
        }

        merge(req, { user: existingUser })

        return next()

    } catch (error) {
        return res.status(401).json({
            success: false,
            error: error.message,
        })
    }
}
