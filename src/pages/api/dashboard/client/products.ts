import prisma from '@/lib/prismadb';
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req
    switch (method) {
        case 'GET':
            try {
                const products = await prisma.product.findMany()

                const productsWithStats = await Promise.all(
                    products.map(async (product) => {
                        const stat = await prisma.productStat.findMany({
                            where: {
                                product_id: product.id,
                            }
                        })
                        return {
                            ...product,
                            stat,
                        };
                    })
                );

                res.status(200).json(productsWithStats);
            } catch (error: any) {
                res.status(404).json({ message: error.message });
            }
            break
        default:
            res.status(400).json({ success: false })
            break
    }
}
