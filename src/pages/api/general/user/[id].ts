import User from "@/lib/models/User";
import dbConnect from "@/lib/mongodb"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req
    await dbConnect()
    switch (method) {
        case 'GET':
            try {
                const { id } = req.query;
                const user = await User.findById(id);
                res.status(200).json(user);
              } catch (error: any) {
                res.status(404).json({ message: error.message });
              }
    }
}