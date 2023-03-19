import prisma from "@/lib/prismadb"
import nodemailer, { SentMessageInfo } from 'nodemailer'
type MailSendResult = { success?: any, error?: string } & ({ success: SentMessageInfo, message: string } | { error: string })

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

        const mailOptions = {
            from: 'DigitalDreams',
            to: mail.email as string,
            subject: 'Restore password',
            html: `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <!-- Importando los archivos CSS de Tailwind -->
                    <title>Password Reset</title>
                    <script src="https://cdn.tailwindcss.com"></script>
                </head>
                <body class="bg-gray-100">
                    <div class="">
                        <div class="bg-gray-100 p-8">
                            <h1 class="text-gray-800 text-2xl font-bold mb-4">Información de la contraseña de tu cuenta en Digital Dreams</h1>
                            <p class="text-gray-600 text-lg">Estimado/a ${mail?.name},</p>
                            <p class="text-gray-600 text-lg">Hemos recibido una solicitud para restablecer tu contraseña en Digital Dreams. Como lo solicitaste, aquí está tu nueva contraseña:</p>
                            <h4>${pass}</h4>
                            <p class="text-gray-600 text-lg">Por razones de seguridad, te recomendamos que cambies tu contraseña lo antes posible. Para hacerlo, inicia sesión en tu cuenta y accede a la configuración de tu perfil. Allí encontrarás la opción para cambiar tu contraseña.</p>
                            <p class="text-gray-600 text-lg">Si no has solicitado un restablecimiento de contraseña, por favor, ignora este correo electrónico y ponte en contacto con nuestro equipo de soporte inmediatamente. Queremos asegurarnos de que tu cuenta esté protegida y segura en todo momento.</p>
                            <p class="text-gray-600 text-lg">Gracias por usar Digital Dreams.</p>
                            <p class="text-gray-600 text-lg">Saludos cordiales,</p>
                            <p class="text-gray-600 text-lg"><b>Equipo de soporte - Digital Dreams</b></p>
                        </div>
                    </div>
                </body>
                </html>
            `,
        };
        const info = await transporter.sendMail(mailOptions)
        return { success: info, message: 'Passed. Email sent.' }

    } catch (err: any) {
        console.error(err.message)
        return { error: err.message }
    }
}
