import prisma from '@/lib/prismadb';
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  const { method } = req
  switch (method) {
    case 'GET':
      try {
        const users = await prisma.account.findMany()
        res.status(200).json(users)
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      try {
        const account = await prisma.account.create(req.body)
        res.status(201).json(account)
      } catch (error) {
        res.status(400).json({ success: false, error: error })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}