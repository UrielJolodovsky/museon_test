import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcrypt'
import { PrismaClient } from '@prisma/client'



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  
    const prisma = new PrismaClient()

    if (req.method === "POST") {
    try {
        const { email, name, password } = req.body;

        const existingUser = await prisma.user.findUnique({
            where: {
                email: email
            }
        })
        if (existingUser) {
            return res.status(400).json({ error: "Email already in use" })
        }

        const hashedPassword = await bcrypt.hash(password, 12)

        const user = await prisma.user.create({
            data: {
                email: email,
                name: name,
                hashedPassword: hashedPassword
            }
        })

    } catch (error) {
        return res.status(400).json({ error: error })
    }
  }
}