function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const spreadsheetId = "TU_ID_DE_SPREADSHEET"; // Reemplazar con tu ID real
    const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
    const sheet =
      spreadsheet.getSheetByName("Addresses") ||
      spreadsheet.insertSheet("Addresses");

    // Agregar headers si no existen
    if (sheet.getLastRow() === 0) {
      const headers = [
        "Timestamp",
        "paymentId",
        "merchantOrderId",
        "name",
        "email",
        "phone",
        "address",
        "city",
        "zipcode",
      ];
      sheet.appendRow(headers);
    }

    // Construir fila en el orden correcto
    const rowData = [
      data.timestamp,
      data.paymentId,
      data.merchantOrderId,
      data.name,
      data.email,
      data.phone,
      data.address,
      data.city,
      data.zipcode,
    ];

    sheet.appendRow(rowData);

    // Enviar email de confirmación
    const emailBody = `
      <h1>¡Gracias por tu compra!</h1>
      <p>Hemos recibido tu pedido correctamente. Aquí están los detalles:</p>
      <ul>
        <li>N° de orden: ${data.merchantOrderId}</li>
        <li>Nombre: ${data.name}</li>
        <li>Dirección: ${data.address}</li>
        <li>Ciudad: ${data.city}</li>
        <li>Código Postal: ${data.zipcode}</li>
      </ul>
      <p>Recibirás actualizaciones sobre el estado de tu envío en los próximos días.</p>
    `;

    GmailApp.sendEmail({
      to: data.email,
      subject: `Confirmación de pedido #${data.merchantOrderId}`,
      htmlBody: emailBody,
    });

    return ContentService.createTextOutput(
      JSON.stringify({
        success: true,
        message: "Datos guardados correctamente",
      }),
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    console.error(error);
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, message: error.message }),
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
