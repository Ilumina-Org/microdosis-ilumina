import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "lucasan.videla@gmail.com",
    pass: "srie cajk uwmc qfas",
  },
});

export async function sendConfirmationEmail(
  to: string,
  data: any,
): Promise<void> {
  const mailOptions = {
    from: '"Tu Empresa" <lucasan.videla@gmail.com>',
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

export async function sendAdminNotification(data: any): Promise<void> {
  const mailOptions = {
    from: '"Sistema de Órdenes" <lucasan.videla@gmail.com>',
    to: "lucasan.videla@gmail.com",
    subject: `Nueva Orden Recibida - ${data.merchantOrderId}`,
    html: `
      <h1 style="color: #ff5722;">¡Nueva orden requiere atención!</h1>

      <h3>Datos del Cliente:</h3>
      <ul>
        <li><strong>Nombre:</strong> ${data.shippingAddress.name}</li>
        <li><strong>Email:</strong> ${data.shippingAddress.email}</li>
        <li><strong>Teléfono:</strong> ${data.shippingAddress.phone}</li>
      </ul>

      <h3>Dirección de Envío:</h3>
      <p>
        ${data.shippingAddress.address}<br>
        ${data.shippingAddress.city}, ${data.shippingAddress.state}<br>
        ${data.shippingAddress.zipCode}, ${data.shippingAddress.country}
      </p>

      <h3>Detalles de Pago:</h3>
      <table border="1" cellpadding="5" style="border-collapse: collapse;">
        <tr>
          <th>ID de Pago</th>
          <th>Estado</th>
          <th>ID de Orden</th>
          <th>Fecha</th>
        </tr>
        <tr>
          <td>${data.paymentId}</td>
          <td style="color: ${data.status === "approved" ? "green" : "red"};">${data.status}</td>
          <td>${data.merchantOrderId}</td>
          <td>${new Date().toLocaleDateString()}</td>
        </tr>
      </table>

      <p style="margin-top: 20px; color: #666;">
        Este pedido fue registrado el ${new Date().toLocaleString()}
      </p>
    `,
  };

  await transporter.sendMail(mailOptions);
}
