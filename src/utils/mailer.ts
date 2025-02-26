import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.example.com",
  port: 587,
  secure: false,
  auth: {
    user: "your-email@example.com",
    pass: "your-email-password",
  },
});

export async function sendConfirmationEmail(
  to: string,
  data: any,
): Promise<void> {
  const mailOptions = {
    from: '"Tu Empresa" <your-email@example.com>',
    to,
    subject: "Confirmación de Registro - Tu Orden ha sido Procesada",
    html: `
      <h1>Hola ${data.shippingAddress.name},</h1>
      <p>¡Gracias por tu compra! Hemos recibido tus datos correctamente y estamos procesando tu pedido.</p>
      <h3>Detalles del Pedido:</h3>
      <ul>
        <li><strong>ID de Pago:</strong> ${data.paymentId}</li>
        <li><strong>Estado:</strong> ${data.status}</li>
        <li><strong>Dirección de Envío:</strong> ${data.shippingAddress.address}</li>
      </ul>
      <p>Si tienes alguna pregunta, no dudes en contactarnos.</p>
      <p>Saludos,<br>Tu Empresa</p>
    `,
  };

  await transporter.sendMail(mailOptions);
}
