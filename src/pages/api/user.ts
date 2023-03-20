import prisma from '@/lib/prismadb';
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req
    const { email } = req.query
    switch (method) {
        case 'GET':
            try {
                const user = await prisma.user.findFirst({
                    where: {
                        email: email as string,
                    },
                })
                res.status(200).json(user)
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
        default:
            res.status(400).json({ success: false })
            break
    }
}