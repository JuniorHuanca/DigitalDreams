import prisma from "@/lib/prismadb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  const year = new Date().getFullYear();
  const date = new Date().toLocaleDateString();
  const month = new Date().toLocaleString("default", {
    month: "long",
  });
  switch (method) {
    case "GET":
      try {
        // hardcoded values
        // const currentMonth = "December";
        // const currentYear = 2022;
        // const currentDay = "2022-12-15";
        const currentMonth = month;
        const currentYear = year;
        const currentDay = date;

        /* Recent Transactions */
        const transactions = await prisma.transaction.findMany({
          take: 50,
          orderBy: {
            createdAt: "desc",
          },
        });

        /* Overall Stats */
        // const overallStat = await OverallStat.find({ year: currentYear });
        const overallStat = await prisma.overallStat.findMany({
          where: {
            year: currentYear,
          },
          include: {
            monthlyData: true,
            dailyData: true,
          },
        });
        return res.status(200).json(overallStat);
        // const {
        //     totalCustomers,
        //     yearlyTotalSoldUnits,
        //     yearlySalesTotal,
        //     monthlyData,
        //     salesByCategory,
        // } = overallStat[0];

        // const thisMonthStats = overallStat[0].monthlyData.find(({ month }: { month: string }) => {
        //     return month === currentMonth;
        // });

        // const todayStats = overallStat[0].dailyData.find(({ date }: { date: string }) => {
        //     return date === currentDay;
        // });

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
