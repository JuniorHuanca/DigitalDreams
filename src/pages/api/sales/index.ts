import OverallStat from "@/lib/models/OverallStat";
import db from "@/lib/mongodb"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req
    await db.dbConnect()
    switch (method) {
        case 'GET':
            try {
                const overallStats = await OverallStat.find();
                res.status(200).json(overallStats[0]);
            } catch (error: any) {
                res.status(404).json({ message: error.message });
            }
    }
    await db.dbConnect()
}