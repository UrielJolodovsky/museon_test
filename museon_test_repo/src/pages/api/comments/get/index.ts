import { authOptions } from '@/lib/auth';
import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth/next';
import { PrismaClient } from '@prisma/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const prisma = new PrismaClient()

    if (req.method === "GET") {
        try {
            const {museoId} = req.query;
            const session = await getServerSession(req, res, authOptions);
            if (session?.user.id === undefined) {
                res.status(401).json({ message: "You are not logged in" })
            }
            const getmessages = await prisma.comments.findMany({
                where: {
                    museumId: museoId!.toString()
                }
            });
            res.status(200).json(getmessages)
        } catch (error) {
            res.status(400).json({ error: error })
        }
    }
}