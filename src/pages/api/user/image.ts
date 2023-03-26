import prisma from '@/lib/prismadb';
import { NextApiRequest, NextApiResponse } from "next"
import { v2 as cloudinary } from "cloudinary";
import formidable from 'formidable-serverless';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req
    const { user } = req.body
    console.log(user)
    switch (method) {
        case 'PATCH':
            try {
                const userUpdate = await prisma.user.update({
                    where: {
                        id: user.id
                    },
                    data: {
                        image: user.image,
                    },
                })
                res.status(201).json(userUpdate)
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
        default:
            res.status(400).json({ success: false })
            break
    }
}