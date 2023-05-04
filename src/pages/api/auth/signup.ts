import prisma from "@/lib/prismadb";
import { Role } from "@prisma/client";
import axios from "axios";
import { hash } from "bcryptjs";
import type { NextApiRequest, NextApiResponse } from "next";
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  switch (method) {
    case "POST":
      if (!req.body) {
        return res.status(404).json({ error: "Missing information." });
      }
      const {
        username,
        email,
        password,
        provider,
      }: {
        username: string;
        email: string;
        password: string;
        provider: string;
      } = req.body;
      // first user is administrator
      let role: Role = "User";
      const users = await prisma.user.findMany();
      if (!users.length) {
        role = "Admin";
      }
      // check duplicate users
      const checkExist = await prisma.user.findUnique({
        where: {
          email,
        },
      });
      if (checkExist) {
        return res
          .status(422)
          .json({ msg: "The account was already created before." });
      } else {
        const passwordhash = await hash(password, 5);
        await prisma?.user.create({
          data: {
            name: username,
            username,
            email,
            password: passwordhash,
            image: "",
            provider: provider,
            role,
          },
        });
        await axios.post(`/api/auth/isnewuser`, {
          user: username,
          email: email,
        });
      }
      res.status(200).json({ msg: "ok", username, email });
      break;
    default:
      res.status(500).json({ msg: "HTTP method not supported" });
      break;
  }
}
