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
        const { userId } = req.query;
        if (!userId)
          return res
            .status(400)
            .json({ success: false, message: "userId is required" });
        if (userId) {
          const orders = await prisma.transaction.findMany({
            where: {
              userId: userId as string,
            },
            include: { products: true },
            orderBy: { createdAt: "desc" },
          });
          return res.status(200).json({ success: true, orders });
        }
      } catch (error) {
        res.status(400).json({ success: false, error: error });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
