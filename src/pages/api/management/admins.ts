import prisma from '@/lib/prismadb';
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req
  const { id, role, name, email } = req.body
  switch (method) {
    case 'GET':
      try {
        const users = await prisma.user.findMany({
          where: {
            role: { not: 'User' as any }
          },
        })
        res.status(200).json(users)
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      try {
        const user = await prisma.user.create(req.body)
        res.status(201).json(user)
      } catch (error) {
        res.status(400).json({ success: false, error: error })
      }
    case 'PATCH':
      try {
        const user = await prisma.user.update({
          where: {
            id: id
          },
          data: {
            id: id,
            role: role,
            name: name,
            email: email
          },
        })
        res.status(201).json(user)
      } catch (error) {
        res.status(400).json({ success: false, error: error })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}