import prisma from "@/lib/prismadb";
import { NextApiRequest, NextApiResponse } from "next";
import { date, month, year } from "@/shared/util/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  switch (method) {
    case "GET":
      try {
        const overallStat = await prisma.overallStat.findFirst({
          where: {
            year: year,
          },
          include: {
            monthlyData: true,
            dailyData: true,
          },
        });
        const {
          totalCustomers,
          yearlySalesTotal,
          yearlyTotalSoldUnits,
          salesByCategory,
          dailyData,
          monthlyData,
        } = overallStat as any;

        console.log(overallStat);
        // res.status(200).json(overallStat);
        res.status(200).json({
          totalCustomers,
          yearlySalesTotal,
          yearlyTotalSoldUnits,
          salesByCategory,
          dailyData,
          monthlyData,
        });
      } catch (error: any) {
        res.status(400).json({ success: false, error: error });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
