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
    const { id } = req.query
    const form = new formidable.IncomingForm();
    switch (method) {
        case 'PATCH':
            form.parse(req, async (err: any, fields: any, files: { userImage: { path: string; }; }) => {
                const { userId } = fields
                if (err) {
                    console.error(err);
                    res.status(500).json({ message: 'Error al procesar la imagen.' });
                    return;
                }

                try {
                    const result = await cloudinary.uploader.upload(files.userImage.path);
                    const userUpdate = await prisma.user.update({
                        where: {
                            id: userId
                        },
                        data: {
                            image: result.secure_url,
                        },
                    })
                    res.status(201).json({ success: false, userUpdate })
                } catch (error) {
                    console.error(error);
                    res.status(400).json({ success: false })
                }
            });
            break
        default:
            res.status(400).json({ success: false })
            break
    }
}