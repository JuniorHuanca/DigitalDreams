import prisma from '@/lib/prismadb';
import { NextApiRequest, NextApiResponse } from "next"


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req
    switch (method) {
        case 'GET':
            try {
                const admins = await prisma.user.findMany({
                    where: {
                        role: 'Admin'
                    }
                })
                res.status(200).json(admins);
            } catch (error: any) {
                res.status(400).json({ success: false, error: error })
            }
            break
        default:
            res.status(400).json({ success: false })
            break
    }
}