import prisma from "@/lib/prismadb";
import { emailOrderConfirmation } from "@/shared/util/emails/orderConfirmation";
import { IProductCart } from "@/shared/util/types";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session: any = await getSession({ req });
  // const session: any = {
  //   user: {
  //     name: "Brayan_libra1@hotmail.com",
  //     email: "Brayan_libra1@hotmail.com",
  //     image: "",
  //     id: "clh6wpes00000t3h4esi2gmi0",
  //     role: "Admin",
  //   },
  //   expires: "2023-06-01T00:08:52.277Z",
  // };
  const year = new Date().getFullYear();
  const date = new Date().toLocaleDateString();
  const month = new Date().toLocaleString("default", {
    month: "long",
  });
  const { method } = req;
  if (!session) {
    return res.status(403).send("forbidden");
  }
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
            where: {
              month,
            },
          });
          return res.status(200).json(data);
        }
        if (dailyData) {
          const data = await prisma.dailyData.findMany({
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
          const transaction = await prisma.transaction.create({
            data: {
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
              where: { productId: productId, year: year },
            });
            if (productStat) {
              const existingMonthlyData = await prisma.monthlyData.findFirst({
                where: {
                  productStatId: productStat.id,
                  month: month,
                },
              });
              if (existingMonthlyData) {
                await prisma.monthlyData.update({
                  where: { id: existingMonthlyData.id },
                  data: {
                    totalSales: {
                      increment: cartItem.product.price * quantity,
                    },
                    totalUnits: { increment: quantity },
                  },
                });
              } else {
                await prisma.monthlyData.create({
                  data: {
                    month: month,
                    totalSales: cartItem.product.price * quantity,
                    totalUnits: quantity,
                    productStat: { connect: { id: productStat.id } },
                  },
                });
              }
              const existingDailyData = await prisma.dailyData.findFirst({
                where: {
                  productStatId: productStat.id,
                  date: date,
                },
              });
              if (existingDailyData) {
                await prisma.dailyData.update({
                  where: { id: existingDailyData.id },
                  data: {
                    totalSales: {
                      increment: cartItem.product.price * quantity,
                    },
                    totalUnits: { increment: quantity },
                  },
                });
              } else {
                await prisma.dailyData.create({
                  data: {
                    date: date,
                    totalSales: cartItem.product.price * quantity,
                    totalUnits: quantity,
                    productStat: { connect: { id: productStat.id } },
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
              const productStat = await prisma.productStat.create({
                include: {
                  monthlyData: true,
                  dailyData: true,
                },
                data: {
                  product: { connect: { id: productId } },
                  yearlySalesTotal: cartItem.product.price * quantity,
                  yearlyTotalSoldUnits: quantity,
                  year: year,
                },
              });
              const existingMonthlyData = await prisma.monthlyData.findFirst({
                where: {
                  productStatId: productId,
                  month: month,
                },
              });
              const existingDailyData = await prisma.dailyData.findFirst({
                where: {
                  productStatId: productId,
                  date: date,
                },
              });
              if (existingMonthlyData) {
                await prisma.monthlyData.update({
                  where: { id: existingMonthlyData.id },
                  data: {
                    totalSales: {
                      increment: cartItem.product.price * quantity,
                    },
                    totalUnits: { increment: quantity },
                  },
                });
              } else {
                await prisma.monthlyData.create({
                  data: {
                    month: month,
                    totalSales: cartItem.product.price * quantity,
                    totalUnits: quantity,
                    productStat: { connect: { id: productStat.id } },
                  },
                });
              }
              if (existingDailyData) {
                await prisma.dailyData.update({
                  where: { id: existingDailyData.id },
                  data: {
                    totalSales: {
                      increment: cartItem.product.price * quantity,
                    },
                    totalUnits: { increment: quantity },
                  },
                });
              } else {
                await prisma.dailyData.create({
                  data: {
                    date: date,
                    totalSales: cartItem.product.price * quantity,
                    totalUnits: quantity,
                    productStat: { connect: { id: productStat.id } },
                  },
                });
              }
            }
          }
          const users = await prisma.user.findMany({});
          const salesDataMonthly = await prisma.monthlyData.findMany({
            where: {
              month: month,
              productStatId: {
                not: null,
              },
              productStat: {
                year: year,
              },
            },
          });
          const salesDataDaily = await prisma.dailyData.findMany({
            where: {
              date: date,
              productStatId: {
                not: null,
              },
              productStat: {
                year: year,
              },
            },
          });
          const totalSalesMonthly = salesDataMonthly
            .map((sale) => sale.totalSales)
            .reduce((acc, curr) => acc + curr, 0);
          const totalSalesDataDaily = salesDataDaily
            .map((sale) => sale.totalSales)
            .reduce((acc, curr) => acc + curr, 0);

          const totalUnitsMonthly = salesDataMonthly
            .map((sale) => sale.totalUnits)
            .reduce((acc, curr) => acc + curr, 0);
          const totalUnitsDataDaily = salesDataDaily
            .map((sale) => sale.totalUnits)
            .reduce((acc, curr) => acc + curr, 0);

          const yearlySalesTotal = salesDataMonthly
            .map((sale) => sale.totalSales)
            .reduce((acc, curr) => acc + curr, 0);
          const yearlyTotalSoldUnits = salesDataMonthly
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
          const overallStat = await prisma.overallStat.upsert({
            where: { year: year },
            create: {
              year: year,
              totalCustomers: users.length,
              yearlySalesTotal: yearlySalesTotal,
              yearlyTotalSoldUnits: yearlyTotalSoldUnits,
              salesByCategory: salesByCategory,
            },
            update: {
              totalCustomers: users.length,
              yearlySalesTotal: yearlySalesTotal,
              yearlyTotalSoldUnits: yearlyTotalSoldUnits,
              salesByCategory: salesByCategory,
            },
          });
          const existingMonthlyData = await prisma.monthlyData.findFirst({
            where: {
              overallStatId: overallStat.id,
              month: month,
            },
          });

          if (existingMonthlyData) {
            await prisma.monthlyData.update({
              where: { id: existingMonthlyData.id },
              data: {
                // totalSales: { increment: totalSalesMonthly },
                // totalUnits: { increment: totalUnitsMonthly },
                totalSales: totalSalesMonthly,
                totalUnits: totalUnitsMonthly,
              },
            });
          } else {
            await prisma.monthlyData.create({
              data: {
                month: month,
                totalSales: totalSalesMonthly,
                totalUnits: totalUnitsMonthly,
                OverallStat: {
                  connect: {
                    id: overallStat.id,
                  },
                },
              },
            });
          }
          const existingDailyData = await prisma.dailyData.findFirst({
            where: {
              overallStatId: overallStat.id,
              date: date,
            },
          });

          if (existingDailyData) {
            await prisma.dailyData.update({
              where: { id: existingDailyData.id },
              data: {
                // totalSales: { increment: totalSalesDataDaily },
                // totalUnits: { increment: totalUnitsDataDaily },
                totalSales: totalSalesMonthly,
                totalUnits: totalUnitsMonthly,
              },
            });
          } else {
            await prisma.dailyData.create({
              data: {
                date: date,
                totalSales: totalSalesDataDaily,
                totalUnits: totalUnitsDataDaily,
                OverallStat: {
                  connect: {
                    id: overallStat.id,
                  },
                },
              },
            });
          }
          emailOrderConfirmation(session.user, transaction.id, cart);
          return res
            .status(200)
            .json({ success: true, transaction, overallStat });
        }
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
