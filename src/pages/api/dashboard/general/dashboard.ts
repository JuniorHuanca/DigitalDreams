import prisma from "@/lib/prismadb";
import { date, lastMonth, lastYear, month, year, yesterday } from "@/shared/util/types";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        // hardcoded values
        // const currentMonth = "December";
        // const currentYear = 2022;
        // const currentDay = "2022-12-15";
        const currentMonth = month;
        const currentYear = year;
        const currentDay = "3/5/2023";

        /* Recent Transactions */
        const transactions = await prisma.transaction.findMany({
          take: 50,
          orderBy: {
            createdAt: "desc",
          },
          include: {
            products: true,
          },
        });

        /* Overall Stats */
        // const overallStat = await OverallStat.find({ year: currentYear });
        const overallStat = await prisma.overallStat.findFirst({
          where: {
            year: year,
          },
          include: {
            monthlyData: true,
            dailyData: true,
          },
        });
        //   const todayStats = overallStat[0].dailyData.find(({ date }: { date: string }) => {
        //     return date === currentDay;
        // });
        console.log(lastYear, yesterday.toLocaleDateString(), lastMonth);
        const todayStats = await prisma.dailyData.findFirst({
          where: {
            date: date,
            overallStatId: {
              not: null,
            },
          },
        });
        const thisMonthStats = await prisma.monthlyData.findFirst({
          where: {
            month: month,
            overallStatId: {
              not: null,
            },
          },
        });
        console.log(todayStats);
        const {
          totalCustomers,
          yearlyTotalSoldUnits,
          yearlySalesTotal,
          monthlyData,
          salesByCategory,
        } = overallStat as any;
        const valorAnterior = 100;
        const valorActual = 114;

        const aumentoPorcentual =
          ((valorActual - valorAnterior) / valorAnterior) * 100;

        const customers = aumentoPorcentual.toFixed(2);
        const dailySales = aumentoPorcentual.toFixed(2);
        const monthlySales = aumentoPorcentual.toFixed(2);
        const yearSales = aumentoPorcentual.toFixed(2);
        return res.status(200).json({
          totalCustomers,
          yearlyTotalSoldUnits,
          yearlySalesTotal,
          monthlyData,
          salesByCategory,
          todayStats,
          thisMonthStats,
          transactions,
          customers,
          dailySales,
          monthlySales,
          yearSales,
        });
        // res.status(200).json({
        //     totalCustomers,
        //     yearlyTotalSoldUnits,
        //     yearlySalesTotal,
        //     monthlyData,
        //     salesByCategory,
        //     thisMonthStats,
        //     todayStats,
        //     transactions,
        // });
      } catch (error: any) {
        return res.status(404).json({ message: error.message });
      }
  }
}
