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
        const { product_id } = req.query;
        const reviews = await prisma.review.findMany({
          where: {
            product_id: parseInt(product_id as string),
            reports: { none: {} },
            // reports: {
            //   has: false,
            //   count: { lt: 3 },
            // },
          },
          include: { user: true },
          orderBy: { createdAt: "desc" },
        });
        res.status(201).json({ success: true, reviews });
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
            // Buscar la revisión correspondiente en la base de datos
            const review = await prisma.review.findUnique({
              where: { id: parseInt(reviewId as string) },
            });

            if (!review) {
              return res
                .status(404)
                .json({ success: false, error: "Review not found" });
            }

            // Crear el nuevo informe
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
        const { product_id, user_id, description, rating } = req.body;
        const review = await prisma.review.create({
          data: {
            product: { connect: { id: product_id } },
            user: { connect: { id: user_id } },
            description,
            rating,
          },
        });
        let newRating = rating;
        const product = await prisma.product.findUnique({
          where: { id: product_id },
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
          where: { id: product_id },
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
        const { review_id, description, rating } = req.body;
        const review = await prisma.review.update({
          where: { id: review_id },
          data: {
            description,
            rating,
          },
        });
        const product = await prisma.product.findUnique({
          where: { id: review.product_id },
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
        const { review_id } = req.query;
        const review = await prisma.review.delete({
          where: { id: parseInt(review_id as string) },
        });
        const product = await prisma.product.findUnique({
          where: { id: review.product_id },
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
