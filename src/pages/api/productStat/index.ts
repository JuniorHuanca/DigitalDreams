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
        const { overallStat, id } = req.query;
        if (id) {
          const productStat = await prisma.productStat.findFirst({
            where: {
              productId: parseInt(id as string),
            },
            include: {
              monthlyData: true,
              dailyData: true,
            },
          });
          return res.status(200).json(productStat);
        }
        if (overallStat) {
          const overallStat = await prisma.overallStat.findMany({
            include: {
              monthlyData: true,
              dailyData: true,
            },
          });
          return res.status(200).json(overallStat);
        }
        const productStat1 = await prisma.productStat.findFirst({
          where: { productId: 244, year: 2023 },
        });
        const productStat = await prisma.productStat.findMany({
          include: {
            product: true,
            monthlyData: true,
            dailyData: true,
          },
        });
        return res.status(200).json({ productStat, productStat1 });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
