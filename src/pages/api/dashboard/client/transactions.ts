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
        const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;
        const generateSort = () => {
          const sortParsed = JSON.parse(sort as string);
          const sortFormatted = {
            [sortParsed.field]: (sortParsed.sort = "asc" ? 1 : -1),
          };

          return sortFormatted;
        };
        const searchValue = Number(search);
        if (search) {
          const transactions = await prisma.transaction.findMany({
            where: {
              OR: [
                !isNaN(searchValue)
                  ? { cost: { equals: parseInt(search as string) } }
                  : { userId: search as string },
              ],
            },
            orderBy: {
              cost: "desc",
            },
            include: {
              products: true,
            },
          });
          return res.status(200).json({
            success: true,
            transactions,
            total: transactions.length,
          });
        }
        const transactions = await prisma.transaction.findMany({
          orderBy: {
            cost: "desc",
          },
          include: {
            products: true,
          },
        });
        res.status(200).json({
          success: true,
          transactions,
          total: transactions.length,
        });
      } catch (error: any) {
        res.status(404).json({ message: error.message });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
