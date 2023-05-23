import prisma from "@/lib/prismadb";
import { productDescriptionParser } from "@/shared/util/backend";
import { NextApiRequest, NextApiResponse } from "next";

import { v2 as cloudinary } from "cloudinary";
import formidable from "formidable-serverless";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  const { id, deleted } = req.query;
  const form = new formidable.IncomingForm();
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
      form.parse(
        req,
        async (err: any, fields: any, files: { image: { path: string } }) => {
          const {
            name,
            price,
            description,
            stock,
            brand,
            subcategory,
            enable,
          } = fields;
          if (err) {
            console.error(err);
            res.status(500).json({ message: "Error al procesar la imagen." });
            return;
          }
          try {
            const active = JSON.parse(enable);
            const result = await cloudinary.uploader.upload(files.image.path);
            var image = result.secure_url.replace(/\.(png|jpeg|jpg)$/, ".webp");
            const product = await prisma.product.create({
              data: {
                name: name,
                price: parseFloat(price),
                description: description,
                stock: parseInt(stock),
                brandId: parseInt(brand),
                image: image,
                subcategoryId: parseInt(subcategory),
                deleted: !active,
              },
            });
            res.status(200).json({ success: true, product });
            // setTimeout(() => {
            //   res.status(201).json({ success: true });
            // }, 5000);
          } catch (error: any) {
            console.error(error);
            res.status(400).json({ success: false, error: error.message });
          }
        }
      );
      break;
    case "PATCH":
      try {
        form.parse(
          req,
          async (err: any, fields: any, files: { image: { path: string } }) => {
            const {
              id,
              name,
              price,
              description,
              stock,
              brand,
              subcategory,
              enable,
            } = fields;
            if (err) {
              console.error(err);
              res.status(500).json({ message: "Error al procesar la imagen." });
              return;
            }
            try {
              const active = JSON.parse(enable);
              if (files.image) {
                const result = await cloudinary.uploader.upload(files.image.path);
                var image = result.secure_url.replace(/\.(png|jpeg|jpg)$/, ".webp");
                const product = await prisma.product.update({
                  where: {
                    id: parseInt(id as string)
                  },
                  data: {
                    name: name,
                    price: parseFloat(price),
                    description: description,
                    stock: parseInt(stock),
                    brandId: parseInt(brand),
                    image: image,
                    subcategoryId: parseInt(subcategory),
                    deleted: !active,
                  },
                });
                return res.status(200).json({ success: true, product });
              } else {
                const product = await prisma.product.update({
                  where: {
                    id: parseInt(id as string)
                  },
                  data: {
                    name: name,
                    price: parseFloat(price),
                    description: description,
                    stock: parseInt(stock),
                    brandId: parseInt(brand),
                    subcategoryId: parseInt(subcategory),
                    deleted: !active,
                  },
                });
                return res.status(200).json({ success: true, product });
              }
            } catch (error: any) {
              console.error(error);
              res.status(400).json({ success: false, error: error.message });
            }
          }
        );
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
