import prisma from '@/lib/prismadb';
import { productDescriptionParser } from '@/shared/util/backend';
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req
    const { id } = req.query
    switch (method) {
        case 'GET':
            try {
                const productFind = await prisma.product.findFirst({
                    where: {
                        id: parseInt(id as string)
                    },
                    include: {
                        brand: true,
                        subcategory: {
                            include: {
                                category: true
                            }
                        },
                        reviews: true
                    },
                })
                const description = productDescriptionParser(productFind?.description as string)
                const product = { ...productFind, description }
                res.status(200).json({ success: true, product })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
        default:
            res.status(400).json({ success: false })
            break
    }
}