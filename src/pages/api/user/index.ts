import prisma from '@/lib/prismadb';
import { compare, hash } from 'bcryptjs';
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req
    const { email } = req.query
    const { user } = req.body
    switch (method) {
        case 'GET':
            try {
                const user = await prisma.user.findFirst({
                    where: {
                        email: email as string,
                    },
                })
                res.status(200).json(user)
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
        case 'PATCH':
            try {
                if (user.change === "password") {
                    const userFind = await prisma.user.findFirst({
                        where: {
                            id: user.id
                        }
                    })
                    const verifyPassword = await compare(
                        user?.currentPassword ?? '',
                        userFind?.password ?? ''
                    );
                    if (!verifyPassword) {
                        return res.status(401).json({ msg: 'Password is incorrect. To change it, it is necessary to enter the current password.', success: false })
                    }
                    const passwordhash = await hash(user.newPassword, 5)
                    const userUpdate = await prisma.user.update({
                        where: {
                            id: user.id
                        },
                        data: {
                            password: passwordhash,
                        },
                    })
                    return res.status(201).json({ msg: "Contraseña Cambiada correctamente!", userUpdate })
                } else {
                    const userUpdate = await prisma.user.update({
                        where: {
                            id: user.id
                        },
                        data: {
                            username: user.username,
                            name: user.name,
                        },
                    })
                    res.status(201).json(userUpdate)
                }
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
        default:
            res.status(400).json({ success: false })
            break
    }
}