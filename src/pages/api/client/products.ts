import Product from "@/lib/models/Product";
import ProductStat from "@/lib/models/ProductStat";
import dbConnect from "@/lib/mongodb"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req
    await dbConnect()
    switch (method) {
        case 'GET':
            try {
                const products = await Product.find();

                const productsWithStats = await Promise.all(
                    products.map(async (product) => {
                        const stat = await ProductStat.find({
                            productId: product._id,
                        });
                        return {
                            ...product._doc,
                            stat,
                        };
                    })
                );

                res.status(200).json(productsWithStats);
            } catch (error: any) {
                res.status(404).json({ message: error.message });
            }
    }
}