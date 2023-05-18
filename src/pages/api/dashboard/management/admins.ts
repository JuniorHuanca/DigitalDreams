import prisma from "@/lib/prismadb";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session: any = await getSession({ req });
  const { method } = req;
  if (!session) {
    return res.status(403).send("forbidden");
  }

  switch (method) {
    case "GET":
      try {
        const admins = await prisma.user.findMany({
          where: {
            role: "Admin",
          },
        });
        res.status(200).json(admins);
      } catch (error: any) {
        res.status(400).json({ success: false, error: error });
      }
      break;
    case "PATCH":
      try {
        const { id, field, value } = req.body;
        if (session.user.role !== "Admin") {
          return res.status(403).json({
            message: "You need the administrator role to make changes.",
            status: 403,
          });
        }
        if (session.user.id === id && field === "role") {
          return res.status(403).json({
            message: "You cannot make changes to yourself.",
            status: 403,
          });
        }

        const userUpdate = await prisma.user.update({
          where: {
            id: id,
          },
          data: {
            [field]: value,
          },
        });
        res
          .status(201)
          .json({ userUpdate, message: "It was successfully updated." });
      } catch (error: any) {
        res.status(400).json({ success: false, error: error });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
