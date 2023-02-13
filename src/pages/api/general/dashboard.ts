import OverallStat from "@/lib/models/OverallStat";
import Transaction from "@/lib/models/Transaction";
import db from "@/lib/mongodb"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req
    await db.dbConnect()
    switch (method) {
        case 'GET':
            try {
                // hardcoded values
                // const currentMonth = "December";
                // const currentYear = 2022;
                // const currentDay = "2022-12-15";
                const currentMonth = "November";
                const currentYear = 2021;
                const currentDay = "2021-01-31";

                /* Recent Transactions */
                const transactions = await Transaction.find()
                    .limit(50)
                    .sort({ createdOn: -1 });

                /* Overall Stats */
                const overallStat = await OverallStat.find({ year: currentYear });

                const {
                    totalCustomers,
                    yearlyTotalSoldUnits,
                    yearlySalesTotal,
                    monthlyData,
                    salesByCategory,
                } = overallStat[0];

                const thisMonthStats = overallStat[0].monthlyData.find(({ month }: { month: string }) => {
                    return month === currentMonth;
                });

                const todayStats = overallStat[0].dailyData.find(({ date }: { date: string }) => {
                    return date === currentDay;
                });

                res.status(200).json({
                    totalCustomers,
                    yearlyTotalSoldUnits,
                    yearlySalesTotal,
                    monthlyData,
                    salesByCategory,
                    thisMonthStats,
                    todayStats,
                    transactions,
                });
            } catch (error: any) {
                res.status(404).json({ message: error.message });
            }
    }
    await db.dbDisconnect()
}