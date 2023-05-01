import prisma from "@/lib/prismadb";
import { IProductCart } from "@/shared/util/types";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session: any = await getSession({ req });
  const year = new Date().getFullYear();
  const date = new Date().toLocaleDateString();
  const month = new Date().toLocaleString("default", {
    month: "long",
  });
  const { method } = req;
  // if (!session) {
  //   return res.status(403).send("forbidden");
  // }
  switch (method) {
    case "GET":
      try {
        const { monthlyData, dailyData, checkoutSession } = req.query;
        if (checkoutSession) {
          const transaction = await prisma.transaction.findFirst({
            where: { checkoutSession: checkoutSession as string },
          });
          return transaction
            ? res.status(200).json({ success: true, transaction })
            : res.status(200).json({ success: false });
        }
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
        const data = await prisma.transaction.findMany({});
        return res.status(200).json(data);
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const { checkoutSession, cart } = req.body;
        if (checkoutSession) {
          const totalPrice: number = cart.reduce(
            (acc: number, curr: IProductCart) =>
              acc + curr.quantity * curr.product.price,
            0
          );
          const transaction = await prisma.transaction.upsert({
            where: {
              checkoutSession: checkoutSession,
            },
            update: {},
            create: {
              user: { connect: { id: session.user.id } },
              cost: totalPrice,
              checkoutSession: checkoutSession,
            },
          });
          for (const cartItem of cart) {
            const productId: number = cartItem.product.id;
            const quantity: number = cartItem.quantity;
            await prisma.product.update({
              where: { id: productId },
              data: {
                stock: { decrement: quantity },
                soldCount: { increment: quantity },
                transactions: {
                  connect: { id: transaction.id },
                },
              },
            });
            const productStat = await prisma.productStat.findFirst({
              where: { productId: productId },
            });
            if (productStat) {
              const users = await prisma.user.findMany({});
              const salesData = await prisma.dailyData.findMany({});
              const yearlySalesTotal = salesData
                .map((sale) => sale.totalSales)
                .reduce((acc, curr) => acc + curr, 0);
              const yearlyTotalSoldUnits = salesData
                .map((sale) => sale.totalUnits)
                .reduce((acc, curr) => acc + curr, 0);
              const products = await prisma.productStat.findMany({
                include: {
                  product: {
                    include: {
                      subcategory: {
                        include: {
                          category: true,
                        },
                      },
                    },
                  },
                },
              });
              const salesByCategory = {} as any;
              products.forEach((item) => {
                if (salesByCategory[item.product.subcategory.category.name]) {
                  salesByCategory[item.product.subcategory.category.name] +=
                    item.yearlySalesTotal;
                } else {
                  salesByCategory[item.product.subcategory.category.name] =
                    item.yearlySalesTotal;
                }
              });
              const overallStatFind = await prisma.overallStat.findFirst({
                where: { year: year },
              });
              let overallStat;
              if (overallStatFind) {
                overallStat = overallStatFind;
              } else {
                overallStat = await prisma.overallStat.create({
                  data: {
                    totalCustomers: users.length,
                    yearlySalesTotal: yearlySalesTotal,
                    yearlyTotalSoldUnits: yearlyTotalSoldUnits,
                    year: year,
                    salesByCategory: salesByCategory,
                  },
                });
              }
              const monthlyData = await prisma.monthlyData.findFirst({
                where: {
                  productStatId: productStat.id,
                  month: month,
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
                    OverallStat: { connect: { id: overallStat.id } },
                  },
                });
              } else {
                await prisma.monthlyData.create({
                  data: {
                    month: month,
                    totalSales: cartItem.product.price * quantity,
                    totalUnits: quantity,
                    productStat: { connect: { id: productStat.id } },
                    OverallStat: { connect: { id: overallStat.id } },
                  },
                });
              }
              const dailyData = await prisma.dailyData.findFirst({
                where: {
                  productStatId: productStat.id,
                  date: date,
                },
              });
              if (dailyData) {
                await prisma.dailyData.update({
                  where: { id: dailyData.id },
                  data: {
                    totalSales:
                      dailyData.totalSales + cartItem.product.price * quantity,
                    totalUnits: dailyData.totalUnits + quantity,
                    OverallStat: { connect: { id: overallStat.id } },
                  },
                });
              } else {
                await prisma.dailyData.create({
                  data: {
                    date: date,
                    totalSales: cartItem.product.price * quantity,
                    totalUnits: quantity,
                    productStat: { connect: { id: productStat.id } },
                    OverallStat: { connect: { id: overallStat.id } },
                  },
                });
              }
              await prisma.productStat.update({
                where: { id: productStat.id },
                data: {
                  yearlySalesTotal: {
                    increment: cartItem.product.price * quantity,
                  },
                  yearlyTotalSoldUnits: { increment: quantity },
                },
              });
            } else {
              const users = await prisma.user.findMany({});
              const salesData = await prisma.dailyData.findMany({});
              const yearlySalesTotal = salesData
                .map((sale) => sale.totalSales)
                .reduce((acc, curr) => acc + curr, 0);
              const yearlyTotalSoldUnits = salesData
                .map((sale) => sale.totalUnits)
                .reduce((acc, curr) => acc + curr, 0);
              const productStat = await prisma.productStat.create({
                data: {
                  product: { connect: { id: productId } },
                  yearlySalesTotal: cartItem.product.price * quantity,
                  yearlyTotalSoldUnits: quantity,
                  year: year,
                },
              });
              const productsFind = await prisma.productStat.findMany({
                include: {
                  product: {
                    include: {
                      subcategory: {
                        include: {
                          category: true,
                        },
                      },
                    },
                  },
                },
              });
              const salesByCategories = {} as any;
              productsFind.forEach((item) => {
                if (salesByCategories[item.product.subcategory.category.name]) {
                  salesByCategories[item.product.subcategory.category.name] +=
                    item.yearlySalesTotal;
                } else {
                  salesByCategories[item.product.subcategory.category.name] =
                    item.yearlySalesTotal;
                }
              });
              const monthlyDataFind = await prisma.monthlyData.upsert({
                where: {
                  month: month,
                },
                update: {
                  totalSales: { increment: cartItem.product.price * quantity },
                  totalUnits: { increment: quantity },
                },
                create: {
                  month: month,
                  totalSales: cartItem.product.price * quantity,
                  totalUnits: quantity,
                  productStat: { connect: { id: productStat.id } },
                },
              });
              const dailyDataFind = await prisma.dailyData.upsert({
                where: {
                  date: date,
                },
                update: {
                  totalSales: { increment: cartItem.product.price * quantity },
                  totalUnits: { increment: quantity },
                },
                create: {
                  date: date,
                  totalSales: cartItem.product.price * quantity,
                  totalUnits: quantity,
                  productStat: { connect: { id: productStat.id } },
                },
              });
              await prisma.productStat.update({
                where: { id: productStat.id },
                data: {
                  monthlyData: { connect: { id: monthlyDataFind.id } },
                  dailyData: { connect: { id: dailyDataFind.id } },
                },
              });
              const products = await prisma.productStat.findMany({
                include: {
                  product: {
                    include: {
                      subcategory: {
                        include: {
                          category: true,
                        },
                      },
                    },
                  },
                },
              });
              const salesByCategory = {} as any;
              products.forEach((item) => {
                if (salesByCategory[item.product.subcategory.category.name]) {
                  salesByCategory[item.product.subcategory.category.name] +=
                    item.yearlySalesTotal;
                } else {
                  salesByCategory[item.product.subcategory.category.name] =
                    item.yearlySalesTotal;
                }
              });
              const overallStat = await prisma.overallStat.upsert({
                where: { year: year },
                update: {
                  yearlySalesTotal: { increment: yearlySalesTotal },
                  yearlyTotalSoldUnits: { increment: yearlyTotalSoldUnits },
                  salesByCategory: { increment: salesByCategory },
                },
                create: {
                  totalCustomers: users.length,
                  yearlySalesTotal: yearlySalesTotal,
                  yearlyTotalSoldUnits: yearlyTotalSoldUnits,
                  year: year,
                  salesByCategory: salesByCategory,
                },
              });
              const monthlyDataList = await prisma.monthlyData.findMany({
                where: { productStatId: productStat.id },
              });
              for (const monthlyData of monthlyDataList) {
                await prisma.monthlyData.update({
                  where: { id: monthlyData.id },
                  data: { OverallStat: { connect: { id: overallStat.id } } },
                });
              }
              const dailyDataList = await prisma.dailyData.findMany({
                where: { productStatId: productStat.id },
              });
              for (const dailyData of dailyDataList) {
                await prisma.dailyData.update({
                  where: { id: dailyData.id },
                  data: { OverallStat: { connect: { id: overallStat.id } } },
                });
              }
            }
          }
          return res.status(200).json({ success: true, transaction });
        }
        return res.status(400).json({ success: false });
      } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: error });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
