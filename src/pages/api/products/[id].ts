import prisma from "@/lib/prismadb";
import { productDescriptionParser } from "@/shared/util/backend";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  const { id, deleted } = req.query;
  switch (method) {
    case "GET":
      try {
        const productFind = await prisma.product.findFirst({
          where: {
            id: parseInt(id as string),
            deleted: false,
          },
          include: {
            brand: true,
            subcategory: {
              include: {
                category: true,
              },
            },
            reviews: true,
          },
        });
        const description = productDescriptionParser(
          productFind?.description as string
        );
        const product = { ...productFind, description };
        res.status(200).json({ success: true, product });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "PATCH":
      try {
        if (deleted) {
          const product = await prisma.product.update({
            where: {
              id: parseInt(id as string),
            },
            data: {
              deleted: false,
            },
          });
          return res.status(200).json({ success: true, product });
        }
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "DELETE":
      try {
        if (deleted) {
          const product = await prisma.product.update({
            where: {
              id: parseInt(id as string),
            },
            data: {
              deleted: true,
            },
          });
          return res.status(200).json({ success: true, product });
        }
        const product = await prisma.product.delete({
          where: {
            id: parseInt(id as string),
          },
        });
        return res.status(200).json({ success: true, product });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
