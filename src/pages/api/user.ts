import prisma from '@/lib/prismadb';
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req
    const { email } = req.query
    const { user } = req.body
    // console.log(user)
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
        case 'PATCH':
            try {
                const userUpdate = await prisma.user.update({
                    where: {
                        id: user.id
                    },
                    data: {
                        username: user.username,
                        name: user.name,
                    },
                })
                res.status(201).json(userUpdate)
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
        default:
            res.status(400).json({ success: false })
            break
    }
}