import prisma from "@/lib/prismadb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  switch (method) {
    case "GET":
      try {
        const { overallStat } = req.query;
        if (overallStat) {
          const productStat = await prisma.overallStat.findMany({
            include: {
              monthlyData: true,
              dailyData: true,
            },
          });
          return res.status(200).json(productStat);
        }
        const productStat = await prisma.productStat.findMany({
          include: {
            product: true,
          },
        });
        return res.status(200).json(productStat);
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
