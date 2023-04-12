import { emailNewUser, emailToUserAdmin } from "@/shared/util/emails/newUser";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  switch (method) {
    case "POST":
      try {
        const { user, email } = req.body;
        emailNewUser(user as string, email as string);
        emailToUserAdmin(user as string, email as string);
        res.status(200).json({ success: true });
      } catch (error) {
        res.status(400).json({ success: false, error: error });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
