import jwt from 'jsonwebtoken'
import prisma from '../db/prisma'
import { get } from 'lodash'
import { Request, Response } from 'express'
import { transformUser } from '../transformers'

export const getProfile = async (req: Request, res: Response) => {
    try {
        const sessionToken = req.cookies['auth_token']
        const decoded = jwt.verify(sessionToken, process.env.JWT_SECRET)

        const user = await prisma.user.findUnique({ where: { id: get(decoded, 'userId')} })

        return res.status(200).json({
            success: true,
            data: transformUser(user),
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            error: error.message,
        })
    }
}

export const updateProfile = async (req: Request, res: Response) => {
    try {
        const sessionToken = req.cookies['auth_token']
        const decoded = jwt.verify(sessionToken, process.env.JWT_SECRET)

        if(req.body.role) {
            throw new Error('Not authorized')
        }

        const user = await prisma.user.update({
            where: {
                id: get(decoded, 'userId')
            },
            data: {
                ...req.body
            }
        })

        return res.status(200).json({
            success: true,
            data: transformUser(user),
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            error: error.message,
        })
    }
}
