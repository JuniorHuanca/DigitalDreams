import prisma from "@/lib/prismadb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  const { deleted } = req.query;

  switch (method) {
    case "GET":
      try {
        if (deleted) {
          const products = await prisma.product.findMany({
            where: {
              deleted: true,
            },
            include: {
              ProductStat: true,
              brand: true,
              subcategory: {
                include: {
                  category: true,
                },
              },
            },
          });
          return res.status(200).json(products);
        }
        const products = await prisma.product.findMany({
          where: {
            deleted: false,
          },
          include: {
            ProductStat: true,
            brand: true,
            subcategory: {
              include: {
                category: true,
              },
            },
          },
        });
        res.status(200).json(products);
      } catch (error: any) {
        res.status(404).json({ message: error.message });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
