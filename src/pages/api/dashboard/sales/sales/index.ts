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
        const currentMonth = monthlyData.pop();

        const months = [
          "enero",
          "febrero",
          "marzo",
          "abril",
          "mayo",
          "junio",
          "julio",
          "agosto",
          "septiembre",
          "octubre",
          "noviembre",
          "diciembre",
        ];

        const previousMonths = [];

        for (let i = 0; i < months.indexOf(currentMonth.month); i++) {
          const monthObj = {
            id: i + 10,
            month: months[i],
            totalSales: 0,
            totalUnits: 0,
            productStatId: null,
            overallStatId: 1,
          };

          previousMonths.push(monthObj);
        }

        console.log(currentMonth);
        console.log(previousMonths);
        console.log(overallStat);
        // res.status(200).json(overallStat);
        res.status(200).json({
          totalCustomers,
          yearlySalesTotal,
          yearlyTotalSoldUnits,
          salesByCategory,
          dailyData,
          monthlyData: previousMonths.concat(currentMonth),
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
