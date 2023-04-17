import prisma from "@/lib/prismadb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  switch (method) {
    case "GET":
      const { search } = req.query;
      try {
        const products = await prisma.product.findMany({
          where: {
            OR: [
              { name: { contains: search as string, mode: "insensitive" } },
              // { city: { contains: search, mode: "insensitive" } },
              // { district: { contains: search, mode: "insensitive" } },
            ],
          },
          include: {
            brand: true,
            subcategory: {
              include: {
                category: true,
              },
            },
          },
          orderBy: {
            name: "asc",
          },
        });
        return res.status(200).json({
          success: true,
          products: products,
        });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
