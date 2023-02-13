import Transaction from "@/lib/models/Transaction";
import User from "@/lib/models/User";
import db from "@/lib/mongodb"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req
    await db.dbConnect()
    switch (method) {
        case 'GET':
            try {
                const { id } = req.query;

                const userWithStats = await User.aggregate([
                    { $match: { _id: new mongoose.Types.ObjectId(id) } },
                    {
                        $lookup: {
                            from: "affiliatestats",
                            localField: "_id",
                            foreignField: "userId",
                            as: "affiliateStats",
                        },
                    },
                    { $unwind: "$affiliateStats" },
                ]);

                const saleTransactions = await Promise.all(
                    userWithStats[0].affiliateStats.affiliateSales.map((id: string) => {
                        return Transaction.findById(id);
                    })
                );
                const filteredSaleTransactions = saleTransactions.filter(
                    (transaction) => transaction !== null
                );

                res
                    .status(200)
                    .json({ user: userWithStats[0], sales: filteredSaleTransactions });
            } catch (error :any) {
                res.status(404).json({ message: error.message });
            }
    }
    await db.dbDisconnect()
}