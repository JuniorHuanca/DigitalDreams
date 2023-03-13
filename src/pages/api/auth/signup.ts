import prisma from '@/lib/prismadb';
import axios from 'axios'
import { hash } from 'bcryptjs'
import type { NextApiRequest, NextApiResponse } from 'next'
export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    // only post method is accepted
    if (req.method === 'POST') {
        if (!req.body) {
            return res.status(404).json({ error: 'Missing information.' })
        }
        const {
            username,
            email,
            password,
        }: { username: string; email: string; password: string } = req.body
        // check duplicate users
        const checkExist = await prisma.user.findUnique({
            where: {
                email,
            },
        })
        if (checkExist) {
            return res.status(422).json({ msg: 'The account was already created before.' })
        } else {
            const passwordhash = await hash(password, 5)
            await prisma?.user.create({
                data: {
                    name: username,
                    email,
                    password: passwordhash,
                },
            })
            // await axios.post(`/api/emails/welcomeEmail`,
            //     {
            //         user: username,
            //         email: email,
            //     },
            // )
        }

        // // hash password

        return res.status(200).json({ msg: 'ok', username, email })
    } else {
        res.status(500).json({ msg: 'HTTP method not supported' })
    }

    res.json({ msg: 'sign up requiered Post' })
}