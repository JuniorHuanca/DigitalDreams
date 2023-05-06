import prisma from "@/lib/prismadb";
import {
  date,
  lastMonth,
  lastYear,
  month,
  year,
  yesterday,
} from "@/shared/util/types";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const transactions = await prisma.transaction.findMany({
          take: 50,
          orderBy: {
            createdAt: "desc",
          },
          include: {
            products: true,
          },
        });
        const overallStat = await prisma.overallStat.findFirst({
          where: {
            year: year,
          },
          include: {
            monthlyData: true,
            dailyData: true,
          },
        });
        const lastOverallStat = await prisma.overallStat.findFirst({
          where: {
            year: lastYear,
          },
          include: {
            monthlyData: true,
            dailyData: true,
          },
        });
        const todayStats = await prisma.dailyData.findFirst({
          where: {
            date: date,
            overallStatId: {
              not: null,
            },
          },
        });
        const lastTodayStats = await prisma.dailyData.findFirst({
          where: {
            date: yesterday.toLocaleDateString(),
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
        const lastMonthStats = await prisma.monthlyData.findFirst({
          where: {
            month: lastMonth,
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
        const aumentoPorcentual = (
          valorAnterior: number | undefined,
          valorActual: number | undefined
        ) => {
          if (valorAnterior !== undefined && valorActual !== undefined) {
            return ((valorActual - valorAnterior) / valorAnterior) * 100;
          } else {
            return 0;
          }
        };

        const customers = Number(
          aumentoPorcentual(lastOverallStat?.totalCustomers, totalCustomers)
        ).toFixed(2);
        const dailySales = Number(
          aumentoPorcentual(lastTodayStats?.totalSales, todayStats?.totalSales)
        ).toFixed(2);
        const monthlySales = Number(
          aumentoPorcentual(
            lastMonthStats?.totalSales,
            thisMonthStats?.totalSales
          )
        ).toFixed(2);
        const yearSales = Number(
          aumentoPorcentual(lastOverallStat?.yearlySalesTotal, yearlySalesTotal)
        ).toFixed(2);
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
          date,
          lastMonth,
          lastYear,
          month,
          year,
          yesterday,
        });
      } catch (error: any) {
        return res.status(404).json({ message: error.message });
      }
  }
}
