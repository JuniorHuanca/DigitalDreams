import nodemailer from "nodemailer";
import { IProductCart } from "../types";

export const emailOrderConfirmation = async (
  user: any,
  orderNumber: any,
  cart: IProductCart[]
) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.GOOGLE_EMAIL,
      pass: process.env.GOOGLE_PASSWORD,
    },
  });
  const totalPrice = cart.reduce(
    (acc, curr) => acc + curr.quantity * curr.product.price,
    0
  );
  const itemList = cart
    .map(
      (item) => `
        <li>
          <div>
          <p>${item.product.image}</p>
          </div>
          <div>
            <h3>${item.product.name}</h3>
            <p><b>Precio:</b> $${item.product.price}</p>
            <p><b>Cantidad:</b> ${item.quantity}</p>
            <p><b>Total:</b> $${item.product.price * item.quantity}</p>
          </div>
        </li>
      `
    )
    .join("");

  const mailOptions = {
    from: "Digital Dreams",
    to: user.email,
    subject: "Confirmación de Pedido - Digital Dreams",
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <!-- Importando los archivos CSS de Tailwind -->
          <title>Confirmación de Pedido</title>
          <script src="https://cdn.tailwindcss.com"></script>
      </head>
        <body>
            <div>
                <div>
                    <h1>Confirmación de Pedido</h1>
                    <p>Estimado/a ${user.name},</p>
                    <p>Gracias por realizar tu pedido en nuestra tienda online. A continuación, te proporcionamos los detalles de tu pedido:</p>
                    <p><b>Número de Pedido:</b> ${orderNumber}</p>
                    <p><b>Productos:</b></p>
                    <ul>
                      ${itemList}
                    </ul>
                    <p><b>Compra Total:</b> $${totalPrice}</p>
                    <p>Estaremos procesando tu pedido lo antes posible. Te enviaremos otra notificación cuando tu pedido sea enviado.</p>
                    <p>Si tienes alguna pregunta o necesitas asistencia adicional, no dudes en contactarnos. ¡Estamos aquí para ayudarte!</p>
                    <p>Gracias nuevamente por elegir nuestra tienda online.</p>
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
      console.error(err.message);
    } else {
      console.info("Email was successfully sent." + info);
    }
  });
};
