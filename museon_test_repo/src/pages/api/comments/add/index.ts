import { authOptions } from '@/lib/auth';
import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth/next';
import { PrismaClient } from '@prisma/client';
import { getSession } from 'next-auth/react';
import { GetServerSideProps } from 'next';
import { getToken } from 'next-auth/jwt';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const prisma = new PrismaClient()
    // const session = await getSession({ req });
    // console.log(session)

    if (req.method === "POST") {
        try {
            const { message } = req.body;
            console.log(req.body)
            const session = await getServerSession(req, res, authOptions);
            // const session: any = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
            console.log(session)
            // const session = await getSession({ req });
            console.log("hi")
            if (message.length === 0) {
                res.status(400).send({ message: "Please write a message" });
            }
            if (session?.user.id === undefined) {
                res.status(401).send({ message: "You are not logged in" });
                console.log("bye")
            }
            const newmessage = await prisma.comments.create({
                data: {
                    content: message,
                    authorId: session!.user.id,
                    museoId: "1"
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