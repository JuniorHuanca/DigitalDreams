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
        const reports = await prisma.review.findMany({
          where: {
            reports: {
              some: {},
            },
          },
          include: {
            reports: {
              include: { user: true },
            },
            user: true,
            product: true,
          },
        });
        // const reports = await prisma.report.findMany({
        //   include: {
        //     review: {
        //       include: {
        //         product: true,
        //       },
        //     },
        //     user: true,
        //   },
        // });
        res.status(200).json({ success: true, reports });
      } catch (error) {
        res.status(400).json({ success: false, error: error });
      }
      break;
    case "PATCH":
      try {
        const { reviewId } = req.query;
        // const reports = await prisma.report.findMany({
        //   where: {
        //     reviewId: parseInt(reviewId as string),
        //   },
        // });
        const reports = await prisma.report.deleteMany({
          where: {
            reviewId: parseInt(reviewId as string),
          },
        });
        res.status(200).json({ success: true, reports });
      } catch (error) {
        res.status(400).json({ success: false, error: error });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
