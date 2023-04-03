import prisma from '@/lib/prismadb';
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req
    switch (method) {
        case 'GET':
            try {
                const overallStats = await prisma.overallStat.findMany()
                console.log(overallStats)
                res.status(200).json(overallStats);
                // res.status(200).json(overallStats[0]);
            } catch (error: any) {
                res.status(400).json({ success: false, error: error })
            }
            break
        default:
            res.status(400).json({ success: false })
            break
    }
}