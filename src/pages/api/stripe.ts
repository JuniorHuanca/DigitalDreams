import Stripe from "stripe";
import { NextApiRequest, NextApiResponse } from "next";
import { IProductCart } from "@/shared/util/types";

// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    console.log(process.env.STRIPE_SECRET_KEY);
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
      apiVersion: "2022-11-15",
    });

    try {
      // Create Checkout Sessions from body params.
      console.log(req.body);
      const params = {
        submit_type: "pay",
        mode: "payment",
        payment_method_types: ["card"],
        billing_address_collection: "auto",
        // shipping_options: [{ shipping_rate: "shr_1Kn3IaEnylLNWUqj5rqhg9oV" }],
        line_items: req.body.map((item: IProductCart) => {
          // const img = item.image[0].asset._ref;
          // const newImage = img
          //   .replace(
          //     "image-",
          //     "https://cdn.sanity.io/images/vfxfwnaw/production/"
          //   )
          //   .replace("-webp", ".webp");

          return {
            price_data: {
              currency: "usd",
              product_data: {
                name: item.product.name,
                images: [item.product.image],
              },
              unit_amount: item.product.price * 100,
            },
            adjustable_quantity: {
              enabled: true,
              minimum: 1,
            },
            quantity: item.quantity,
          };
        }),
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/wrong`,
      };
      console.log(params);

      const session = await stripe.checkout.sessions.create(params as any);
      console.log(session);

      res.status(200).json(session);
    } catch (err: any) {
      return res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    return res.status(405).end("Method Not Allowed");
  }
}
