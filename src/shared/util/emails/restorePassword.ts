import prisma from "@/lib/prismadb"
import nodemailer, { SentMessageInfo } from 'nodemailer'
type MailSendResult = { success?: any, error?: string } & ({ success: SentMessageInfo, message: string } | { error: string })
import fs from 'fs';

const template = fs.readFileSync('src/shared/util/emails/password_reset_template.html', 'utf8');

export default async function mailSend(email: string, pass: string): Promise<MailSendResult> {
    try {
        const mail = await prisma.user.findUniqueOrThrow({
            where: {
                email: email,
            },
            select: {
                email: true,
                name: true,
                password: true,
            },
        })

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.GOOGLE_EMAIL,
                pass: process.env.GOOGLE_PASSWORD,
            },
        })
        if (template !== null) {
            const html = template
                .replace('{{name}}', mail.name as string)
                .replace('{{pass}}', pass);
        
            const mailOptions = {
                from: 'DigitalDreams',
                to: mail.email as string,
                subject: 'Restore password',
                html: html,
            };
            const info = await transporter.sendMail(mailOptions)
            return { success: info, message: 'Passed. Email sent.' }
        }
        return { error: "email not found" }

    } catch (err: any) {
        console.error(err.message)
        return { error: err.message }
    }
}
