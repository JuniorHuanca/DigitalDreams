import prisma from "@/lib/prismadb"
import { hash } from 'bcryptjs'
import type { NextApiRequest, NextApiResponse } from 'next'
import mailSend from "@/shared/util/emails/restorePassword"
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const { email } = req.body
    if (req.method === 'PUT') {
        if (email) {
            try {
                const user = await prisma.user.findUnique({
                    where: {
                        email: email,
                    },
                    select: {
                        name: true,
                        password: true,
                    },
                })
                if (user?.name && user?.password !== null) {
                    let generador = ''
                    const characters =
                        '0123456789abcdfghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ.?,;-_!*%&$/(){}|@><'
                    do {
                        generador = ''
                        for (let i = 0; i < 10; i++) {
                            const aleatorio = Math.floor(Math.random() * characters.length)
                            generador += characters.charAt(aleatorio)
                        }
                    } while (generador.length < 8)

                    const newPass = `CQ21${generador}*`
                    const mail = await mailSend(email, newPass)
                    if (mail.success) {
                        const passwordhash = await hash(newPass, 5)
                        await prisma.user.update({
                            where: {
                                email: email,
                            },
                            data: {
                                password: passwordhash,
                            },
                        })
                        res.status(200).send(passwordhash)
                    } else {
                        res.status(400).send('error')
                    }
                } else {
                    res.status(400).send('error')
                }
            } catch (error) {
                console.error(error)
            }
        }
    }
}