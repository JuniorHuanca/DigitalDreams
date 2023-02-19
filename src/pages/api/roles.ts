import prisma from '@/lib/prismadb';
import type { NextApiRequest, NextApiResponse } from 'next'
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const roles = await prisma.role.findMany()
    return res.json(roles)
}