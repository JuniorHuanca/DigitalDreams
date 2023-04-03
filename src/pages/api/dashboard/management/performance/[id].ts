import prisma from '@/lib/prismadb';
import { NextApiRequest, NextApiResponse } from "next"


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req
    switch (method) {
        case 'GET':
            try {
                const { id } = req.query;

                const userWithStats = await prisma.user.findUnique({
                    where: {
                        id: id as string
                    },
                    include: {
                        affiliateStat: true
                    }
                });

                // const affiliateSales = userWithStats?.affiliateStat.affiliateSales;

                // const saleTransactions = await prisma.transaction.findMany({
                //     where: {
                //         id: {
                //             in: affiliateSales
                //         }
                //     }
                // });

                // res.status(200).json({ user: userWithStats, sales: saleTransactions });
                res.status(200).json({ user: userWithStats });

            } catch (error: any) {
                res.status(404).json({ message: error.message });
            }
            break
        default:
            res.status(400).json({ success: false })
            break
    }
}