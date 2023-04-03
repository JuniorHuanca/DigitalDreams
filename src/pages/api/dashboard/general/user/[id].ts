import prisma from '@/lib/prismadb';
import { NextApiRequest, NextApiResponse } from "next"


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req
  switch (method) {
    case 'GET':
      try {
        const { id } = req.query;
        const user = await prisma.user.findFirst({ where: { id: id as string } });
        res.status(200).json(user);
      } catch (error: any) {
        res.status(404).json({ message: error.message });
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}