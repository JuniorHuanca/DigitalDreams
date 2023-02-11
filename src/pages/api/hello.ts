// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ name: 'John Doe' })
}
// import dbConnect from "@/lib/mongodb"
// import { NextApiRequest, NextApiResponse } from "next"

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     const { method } = req
//     await dbConnect()
//     switch (method) {
//         case 'GET':
            
//     }
// }