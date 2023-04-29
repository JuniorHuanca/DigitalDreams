import prisma from "@/lib/prismadb";
import { IProductCart } from "@/shared/util/types";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session: any = await getSession({ req });
  const { method } = req;
  // if (!session) {
  //   return res.status(403).send("forbidden");
  // }
  switch (method) {
    case "GET":
      try {
        const { monthlyData, dailyData } = req.query;
        if (monthlyData) {
          const data = await prisma.monthlyData.findMany({
            // include: {
            //   accounts: true,
            // },
          });
          return res.status(200).json(data);
        }
        if (dailyData) {
          const data = await prisma.dailyData.findMany({
            // include: {
            //   accounts: true,
            // },
          });
          return res.status(200).json(data);
        }
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const { checkoutSession, cart } = req.body;
        if (checkoutSession) {
          for (const cartItem of cart) {
            const productId: number = cartItem.product.id;
            const quantity: number = cartItem.quantity;

            await prisma.product.update({
              where: { id: productId },
              data: {
                stock: { decrement: quantity },
                soldCount: { increment: quantity },
              },
            });
            const productStat = await prisma.productStat.findFirst({
              where: { productId: productId },
            });
            if (productStat) {
              // Update the existing
              const monthlyData = await prisma.monthlyData.findFirst({
                where: {
                  productStatId: productStat.id,
                  month: new Date().toLocaleString("default", {
                    month: "long",
                  }),
                },
              });
              if (monthlyData) {
                await prisma.monthlyData.update({
                  where: { id: monthlyData.id },
                  data: {
                    totalSales:
                      monthlyData.totalSales +
                      cartItem.product.price * quantity,
                    totalUnits: monthlyData.totalUnits + quantity,
                  },
                });
              } else {
                await prisma.monthlyData.create({
                  data: {
                    month: new Date().toLocaleString("default", {
                      month: "long",
                    }),
                    totalSales: cartItem.product.price * quantity,
                    totalUnits: quantity,
                    productStat: { connect: { id: productStat.id } },
                  },
                });
              }
              const dailyData = await prisma.dailyData.findFirst({
                where: {
                  productStatId: productStat.id,
                  date: new Date().toLocaleDateString(),
                },
              });
              if (dailyData) {
                await prisma.dailyData.update({
                  where: { id: dailyData.id },
                  data: {
                    totalSales:
                      dailyData.totalSales + cartItem.product.price * quantity,
                    totalUnits: dailyData.totalUnits + quantity,
                  },
                });
              } else {
                await prisma.dailyData.create({
                  data: {
                    date: new Date().toLocaleDateString(),
                    totalSales: cartItem.product.price * quantity,
                    totalUnits: quantity,
                    productStat: { connect: { id: productStat.id } },
                  },
                });
              }

              await prisma.productStat.update({
                where: { id: productStat.id },
                data: {
                  yearlySalesTotal:
                    productStat.yearlySalesTotal +
                    cartItem.product.price * quantity,
                  yearlyTotalSoldUnits:
                    productStat.yearlyTotalSoldUnits + quantity,
                  monthlyData: {
                    connect: { id: productStat.id },
                  },
                  dailyData: {
                    connect: { id: productStat.id },
                    // connectOrCreate: {
                    //   where: {
                    //     id: productStat.id,
                    //   },
                    //   create: {
                    //     date: new Date().toLocaleDateString(),
                    //     totalSales: cartItem.product.price * quantity,
                    //     totalUnits: quantity,
                    //   },
                    //   // update: {
                    //   //   totalSales:
                    //   //     dailyData.totalSales +
                    //   //     cartItem.product.price * quantity,
                    //   //   totalUnits: dailyData.totalUnits + quantity,
                    //   // },
                    // },
                  },
                },
              });
              return res.status(200).json({ success: false, productStat });
            } else {
              // Create a new productStat
              const productStat = await prisma.productStat.create({
                data: {
                  product: { connect: { id: productId } },
                  yearlySalesTotal: cartItem.product.price * quantity,
                  yearlyTotalSoldUnits: quantity,
                  monthlyData: {
                    create: {
                      month: new Date().toLocaleString("default", {
                        month: "long",
                      }),
                      totalSales: cartItem.product.price * quantity,
                      totalUnits: quantity,
                    },
                  },
                  year: new Date().getFullYear(),
                  dailyData: {
                    create: {
                      date: new Date().toLocaleDateString(),
                      totalSales: cartItem.product.price * quantity,
                      totalUnits: quantity,
                    },
                  },
                },
              });
              return res.status(200).json({ success: false, productStat });
            }
          }
          const totalPrice = cart.reduce(
            (acc: number, curr: IProductCart) =>
              acc + curr.quantity * curr.product.price,
            0
          );
          const productIds = cart.map((cartItem: IProductCart) => cartItem.id);
          const transaction = await prisma.transaction.create({
            data: {
              user: { connect: { id: session?.user.id } },
              cost: totalPrice,
              products: { connect: { id: productIds } },
            },
          });
        }
        console.log(session);
        console.log(checkoutSession, cart);
        res.status(200).json(checkoutSession);
      } catch (error) {
        res.status(400).json({ success: false, error: error });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
