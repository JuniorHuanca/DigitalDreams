import prisma from "@/lib/prismadb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  const { userId, productId } = req.query;
  switch (method) {
    case "GET":
      try {
        console.log(userId)
        if (!userId)
          return res
            .status(400)
            .json({ success: false, message: "userId is required" });
        const favorites = await prisma.favorite.findMany({
          where: {
            userId: userId as string,
          },
          include: {
            product: {
              include: {
                brand: true,
              }
            },
          },
        });
        res.status(201).json({ success: true, favorites });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const favorite = await prisma.favorite.upsert({
          where: {
            userId_productId: {
              userId: userId as string,
              productId: parseInt(productId as string),
            },
          },
          update: {},
          create: {
            userId: userId as string,
            productId: parseInt(productId as string),
          },
        });

        if (favorite) {
          res.status(201).json({ success: true, favorite });
        } else {
          res.status(400).json({
            success: false,
            error: "Failed to create favorite",
          });
        }
      } catch (error) {
        res.status(400).json({ success: false, error: error });
      }
      break;
    case "DELETE":
      try {
        const favorite = await prisma.favorite.delete({
          where: {
            userId_productId: {
              userId: userId as string,
              productId: parseInt(productId as string),
            },
          },
        });
        res.status(201).json({ success: true, favorite });
      } catch (error) {
        res.status(400).json({ success: false, error: error });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
