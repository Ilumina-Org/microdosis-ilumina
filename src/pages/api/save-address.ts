export async function post({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  // Validación básica
  if (!data.email || !data.address) {
    return new Response(
      JSON.stringify({ success: false, message: "Faltan campos requeridos" }),
      { status: 400 },
    );
  }

  data.timestamp = new Date().toISOString();

  try {
    const GOOGLE_SCRIPT_URL = "TU_URL_DEPLOYED_SCRIPT"; // Reemplazar con tu URL real

    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.message || "Error al guardar en Google Sheets");
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Datos guardados y correo enviado exitosamente",
      }),
      { status: 200 },
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        message: error.message,
      }),
      { status: 500 },
    );
  }
}
