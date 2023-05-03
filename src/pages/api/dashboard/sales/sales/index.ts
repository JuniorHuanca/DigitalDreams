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
        const valorAnterior = 100;
        const valorActual = 114;

        const aumentoPorcentual =
          ((valorActual - valorAnterior) / valorAnterior) * 100;

        const customers = aumentoPorcentual.toFixed(2);
        const dailySales = aumentoPorcentual.toFixed(2);
        const monthlySales = aumentoPorcentual.toFixed(2);
        const yearSales = aumentoPorcentual.toFixed(2);
        console.log(overallStat);
        // res.status(200).json(overallStat);
        res.status(200).json({
          totalCustomers,
          yearlySalesTotal,
          yearlyTotalSoldUnits,
          salesByCategory,
          dailyData,
          monthlyData,
          customers,
          dailySales,
          monthlySales,
          yearSales,
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
