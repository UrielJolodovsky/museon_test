import { authOptions } from '@/lib/auth';
import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth';
import { PrismaClient } from '@prisma/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const prisma = new PrismaClient()

    if (req.method === "POST") {
        try {
            const { message } = req.body;
            console.log(req.body)
            const session = await getServerSession(authOptions);
            if (message.length === 0) {
                res.status(400).send({ message: "Please write a message" });
            }
            if (session?.user.id === undefined) {
                res.status(401).send({ message: "You are not logged in" });
            }
            const newmessage = await prisma.comments.create({
                data: {
                    content: message,
                    authorId: session!.user?.id
                },
            });
            res.status(200).send({ message: "Add comment successfully" });
        } catch (error) {
            res.status(400).json({ error: error })
        }
    }
    if (req.method === "GET") {
        res.status(200).json({ name: "Uriel" })
    }

}