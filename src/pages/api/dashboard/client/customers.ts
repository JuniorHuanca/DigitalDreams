import prisma from '@/lib/prismadb';
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req
    switch (method) {
        case 'GET':
            try {
                const customers = await prisma.user.findMany({
                    where: {
                        role: 'User'
                    }
                })
                res.status(200).json(customers);
            } catch (error: any) {
                res.status(404).json({ message: error.message });
            }
            break
        default:
            res.status(400).json({ success: false })
            break
    }
}