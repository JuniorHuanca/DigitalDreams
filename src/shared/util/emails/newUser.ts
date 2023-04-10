import nodemailer from 'nodemailer'

export const emailNewUser = async (user: string, email: string) => {
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
    from: 'Digital Dreams',
    to: email,
    subject: 'Welcome to Digital Dreams',
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
          <body>
              <div>
                  <div>
                      <h1>Bienvenido/a a nuestra tienda online</h1>
                      <p>Estimado/a ${user},</p>
                      <p>Gracias por registrarte en nuestra tienda online. Nos complace darte la bienvenida a nuestra comunidad de entusiastas de la tecnología.</p>
                      <p>Desde ahora, tienes acceso a una amplia variedad de productos tecnológicos, desde dispositivos móviles hasta equipos de cómputo de alta gama. Podrás navegar por nuestro catálogo y realizar compras de manera fácil y segura.</p>
                      <p>Además, si tienes alguna duda o necesitas asesoramiento, nuestro equipo de expertos está a tu disposición para ayudarte. ¡Queremos que tu experiencia de compra sea lo más satisfactoria posible!</p>
                      <p>Te agradecemos nuevamente por elegir nuestra tienda online. ¡Disfruta de tu experiencia de compra!</p>
                      <p>Saludos cordiales,</p>
                      <p><b>Equipo de soporte - Digital Dreams</b></p>
                  </div>
              </div>
          </body>
        </html>
    `,
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error(err.message)
    } else {
      console.info('Email was successfully sent.' + info)
    }
  })
}
export const emailToUserAdmin = async (user: string, email: string) => {
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
    to: email,
    subject: 'Welcome to DigitalDreams',
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
          <body>
            <div>
              <div>
                <h1>Bienvenido/a a mi aplicación</h1>
                <p>Estimado/a ${user},</p>
                <p>¡Gracias por registrarte en mi aplicación! Espero que disfrutes de todas sus funcionalidades y que sea de gran utilidad para ti.</p>
                <p>Como desarrollador web, he construido esta aplicación con mucho esfuerzo y dedicación. Me alegra mucho que te hayas registrado y estés interesado/a en conocer más sobre ella.</p>
                <p>Si deseas explorar más sobre la aplicación y ver el sistema de gestión (dashboard), puedes acceder con las siguientes credenciales:</p>
                <p><b>Usuario:</b> DigitalDreams@gmail.com</p>
                <p><b>Contraseña:</b> DigitalDreams21@</p>
                <p>El dashboard te permitirá visualizar y administrar la información de todo el sistema de la aplicación, así como realizar diferentes acciones.</p>
                <p>Si tienes alguna duda o necesitas ayuda, mi equipo de soporte está a tu disposición para brindarte asistencia en cualquier momento.</p>
                <p>Espero que disfrutes de la aplicación tanto como yo disfruté construyéndola. ¡Gracias de nuevo por registrarte!</p>
                <p>Saludos cordiales,</p>
                <p><b>Junior Huanca</b></p>
              </div>
            </div>
          </body>
        </html>
    `,
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error(err.message)
    } else {
      console.info('Email was successfully sent.' + info)
    }
  })
}
