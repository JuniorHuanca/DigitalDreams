import prisma from '@/lib/prismadb';
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req
  switch (method) {
    case 'POST':
      try {
        const { product_id, user_id, description, rating } = req.body;
        console.log(product_id, user_id, description, rating)
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
        // res.status(201).json('updatedProduct');
      } catch (error) {
        res.status(400).json({ success: false, error: error });
      }
      break;
    default:
      res.status(400).json({ success: false })
      break
  }
}