import prisma from '../db/prisma'
import { Request, Response } from 'express'
import { transformUserArray, transformUser } from '../transformers'

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany()

        return res.status(200).json({
            success: true,
            data: transformUserArray(users),
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            error: error.message,
        })
    }
}

export const editUser = async (req: Request, res: Response) => {
    const { id } = req.query

    try {
        const user = await prisma.user.update({
            where: {
                id: id as string
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

export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.query

    try {
        const user = await prisma.user.delete({
            where: {
                id: id as string
            }
        })

        return res.status(200).json({
            success: true,
            data: user,
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            error: error.message,
        })
    }
}
