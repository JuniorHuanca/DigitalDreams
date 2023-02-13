import User from "@/lib/models/User";
import db from "@/lib/mongodb"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req
    await db.dbConnect()
    switch (method) {
        case 'GET':
            try {
                const admins = await User.find({ role: "admin" }).select("-password");
                res.status(200).json(admins);
            } catch (error: any) {
                res.status(404).json({ message: error.message });
            }
    }
    await db.dbDisconnect()
}