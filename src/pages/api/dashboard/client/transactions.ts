import prisma from '@/lib/prismadb';
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req
    switch (method) {
        case 'GET':
            try {
                // sort should look like this: { "field": "userId", "sort": "desc"}
                const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;

                // formatted sort should look like { userId: -1 }
                const generateSort = () => {
                    const sortParsed = JSON.parse(sort as string);
                    const sortFormatted = {
                        [sortParsed.field]: (sortParsed.sort = "asc" ? 1 : -1),
                    };

                    return sortFormatted;
                };
                const sortFormatted = Boolean(sort) ? generateSort() : {};

                // const transactions = await Transaction.find({
                //     $or: [
                //         { cost: { $regex: new RegExp(search as string, "i") } },
                //         { userId: { $regex: new RegExp(search as string, "i") } },
                //     ],
                // })
                //     .sort(sortFormatted as any)
                //     .skip((page as number) * (pageSize as number))
                //     .limit(pageSize as number);

                // const total = await Transaction.countDocuments({
                //     name: { $regex: search, $options: "i" },
                // });

                // res.status(200).json({
                //     transactions,
                //     total,
                // });
                res.status(503).json({ success: false })
            } catch (error: any) {
                res.status(404).json({ message: error.message });
            }
            break
        default:
            res.status(400).json({ success: false })
            break
    }
}