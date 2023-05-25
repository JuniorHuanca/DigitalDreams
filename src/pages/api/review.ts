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
        const { productId, userId } = req.query;
        if (productId) {
          const reviews = await prisma.review.findMany({
            where: {
              productId: parseInt(productId as string),
              // reports: { none: {} },
              // reports: {
              //   has: false,
              //   count: { lt: 3 },
              // },
            },
            include: { user: true },
            orderBy: { createdAt: "desc" },
          });
          return res.status(200).json({ success: true, reviews });
        }
        if (userId) {
          const reviews = await prisma.review.findMany({
            where: {
              userId: userId as string,
              // reports: { none: {} },
              // reports: {
              //   has: false,
              //   count: { lt: 3 },
              // },
            },
            include: { product: true },
            orderBy: { createdAt: "desc" },
          });
          return res.status(200).json({ success: true, reviews });
        }
      } catch (error) {
        res.status(400).json({ success: false, error: error });
      }
      break;
    case "POST":
      try {
        const { report } = req.query;
        if (report) {
          const { userId, reason, reviewId } = req.body;
          try {
            const review = await prisma.review.findUnique({
              where: { id: parseInt(reviewId as string) },
            });
            if (!review) {
              return res
                .status(404)
                .json({ success: false, error: "Review not found" });
            }
            const report = await prisma.report.create({
              data: {
                reason,
                user: { connect: { id: userId } },
                review: { connect: { id: review.id } },
              },
            });
            res.status(201).json({ success: true, report });
          } catch (error: any) {
            res.status(400).json({ success: false, error: error.message });
          }
          break;
        }
        const { productId, userId, description, rating } = req.body;
        const review = await prisma.review.create({
          data: {
            product: { connect: { id: productId } },
            user: { connect: { id: userId } },
            description,
            rating,
          },
        });
        let newRating = rating;
        const product = await prisma.product.findUnique({
          where: { id: productId },
          include: { reviews: true },
        });
        const numReviews = product?.reviews.length || 0;
        if (numReviews > 0) {
          const totalRating = product?.reviews.reduce(
            (sum, review) => sum + review.rating,
            0
          );
          newRating = (totalRating + rating) / (numReviews + 1);
        }
        // Update the corresponding product record with the new review and rating
        const updatedProduct = await prisma.product.update({
          where: { id: productId },
          data: {
            reviews: { connect: { id: review.id } },
            rating: parseFloat(newRating.toFixed(1)),
          },
          include: { reviews: true },
        });
        res.status(201).json({ success: true, updatedProduct });
      } catch (error) {
        res.status(400).json({ success: false, error: error });
      }
      break;
    case "PUT":
      try {
        const { reviewId, description, rating } = req.body;
        const review = await prisma.review.update({
          where: { id: reviewId },
          data: {
            description,
            rating,
          },
        });
        const product = await prisma.product.findUnique({
          where: { id: review.productId },
          include: { reviews: true },
        });
        const numReviews = product?.reviews.length || 0;
        if (numReviews > 0) {
          const totalRating = product?.reviews.reduce(
            (sum, review) => sum + review.rating,
            0
          );
          const newRating = totalRating ? totalRating / numReviews : 0;
          await prisma.product.update({
            where: { id: product?.id },
            data: { rating: parseFloat(newRating.toFixed(1)) },
          });
        }
        res.status(200).json({ success: true, review });
      } catch (error) {
        res.status(400).json({ success: false, error: error });
      }
      break;
    case "DELETE":
      try {
        const { reviewId } = req.query;
        const review = await prisma.review.delete({
          where: { id: parseInt(reviewId as string) },
        });
        const product = await prisma.product.findUnique({
          where: { id: review.productId },
          include: { reviews: true },
        });
        const numReviews = product?.reviews.length || 0;
        if (numReviews > 0) {
          const totalRating = product?.reviews.reduce(
            (sum, review) => sum + review.rating,
            0
          );
          const newRating = totalRating ? totalRating / numReviews : 0;
          await prisma.product.update({
            where: { id: product?.id },
            data: { rating: parseFloat(newRating.toFixed(1)) },
          });
        } else {
          await prisma.product.update({
            where: { id: product?.id },
            data: { rating: 0 },
          });
        }
        res.status(200).json({ success: true, review });
      } catch (error) {
        res.status(400).json({ success: false, error: error });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
