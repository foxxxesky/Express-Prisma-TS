import { NextFunction, Request, Response } from 'express'

import prisma from '../db/prisma'
import { encrypt, decrypt } from '../helpers/encrypt'
import cookieToken from '../utils/cookieToken'


export const register = async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body

    try {
        if (!name || !email || !password) {
            throw new Error('Please fill all fields')
        }

        const existingUser = await prisma.user.findUnique({
            where: {
                email
            }
        })

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: encrypt(password),
            }
        })

        
        if (existingUser) {
            throw new Error('User already exists')
        }
        
        return res.status(201).json({
            success: true,
            data: user,
        })

        
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message,
        })
    }
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {email, password} = req.body

        if (!email || !password) {
            throw new Error('Please fill all fields')
        }

        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if (!user) {
            throw new Error('User does not exist')
        }

        const passwordCheck = decrypt(password, user.password)

        if (!passwordCheck) {
            throw new Error('Invalid credentials')
        }

        cookieToken(user, res)

    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message,
        })
    }
}