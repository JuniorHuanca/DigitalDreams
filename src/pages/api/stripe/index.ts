import Stripe from "stripe";
import prisma from "@/lib/prismadb";
import { NextApiRequest, NextApiResponse } from "next";
import { IProductCart } from "@/shared/util/types";

// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
      apiVersion: "2022-11-15",
    });

    try {
      const params = {
        submit_type: "pay",
        mode: "payment",
        payment_method_types: ["card"],
        billing_address_collection: "auto",
        shipping_address_collection: {
          allowed_countries: [
            "US",
            "AE",
            "AG",
            "AL",
            "AM",
            "AR",
            "AT",
            "AU",
            "BA",
            "BE",
            "BG",
            "BH",
            "BO",
            "CA",
            "CH",
            "CI",
            "CL",
            "CO",
            "CR",
            "CY",
            "CZ",
            "DE",
            "DK",
            "DO",
            "EC",
            "EE",
            "EG",
            "ES",
            "ET",
            "FI",
            "FR",
            "GB",
            "GH",
            "GM",
            "GR",
            "GT",
            "GY",
            "HK",
            "HR",
            "HU",
            "ID",
            "IE",
            "IL",
            "IS",
            "IT",
            "JM",
            "JO",
            "JP",
            "KE",
            "KH",
            "KR",
            "KW",
            "LC",
            "LI",
            "LK",
            "LT",
            "LU",
            "LV",
            "MA",
            "MD",
            "MG",
            "MK",
            "MN",
            "MO",
            "MT",
            "MU",
            "MX",
            "MY",
            "NA",
            "NG",
            "NL",
            "NO",
            "NZ",
            "OM",
            "PA",
            "PE",
            "PH",
            "PL",
            "PT",
            "PY",
            "QA",
            "RO",
            "RS",
            "RW",
            "SA",
            "SE",
            "SG",
            "SI",
            "SK",
            "SN",
            "SV",
            "TH",
            "TN",
            "TR",
            "TT",
            "TZ",
            "UY",
            "UZ",
            "VN",
            "ZA",
            "BD",
            "BJ",
            "MC",
            "NE",
            "SM",
            "AZ",
            "BN",
            "BT",
            "AO",
            "DZ",
            "TW",
            "BS",
            "BW",
            "GA",
            "LA",
            "MZ",
          ],
        },
        shipping_options: [
          { shipping_rate: "shr_1N1HF5K9GNzBJvolaqFlPJ0H" },
          { shipping_rate: "shr_1N1HGJK9GNzBJvol0uXFKlnp" },
          // {
          //   shipping_rate_data: {
          //     type: 'fixed_amount',
          //     fixed_amount: {amount: 0, currency: 'usd'},
          //     display_name: 'Free shipping',
          //     delivery_estimate: {
          //       minimum: {unit: 'business_day', value: 5},
          //       maximum: {unit: 'business_day', value: 7},
          //     },
          //   },
          // },
          // {
          //   shipping_rate_data: {
          //     type: 'fixed_amount',
          //     fixed_amount: {amount: 1500, currency: 'usd'},
          //     display_name: 'Next day air',
          //     delivery_estimate: {
          //       minimum: {unit: 'business_day', value: 1},
          //       maximum: {unit: 'business_day', value: 1},
          //     },
          //   },
          // },
        ],
        line_items: req.body.map((item: IProductCart) => {
          return {
            price_data: {
              currency: "usd",
              product_data: {
                name: item.product.name,
                images: [item.product.image],
              },
              unit_amount: item.product.price * 100,
            },
            // adjustable_quantity: {
            //   enabled: false,
            //   minimum: 1,
            //   maximum: item.product.stock,
            // },
            quantity: item.quantity,
          };
        }),
        success_url: `${req.headers.origin}/success?checkoutSession={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.referer}`,
      };
      const checkoutSession = await stripe.checkout.sessions.create(
        params as any
      );
      res.status(200).json(checkoutSession);
    } catch (err: any) {
      return res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    return res.status(405).end("Method Not Allowed");
  }
}
