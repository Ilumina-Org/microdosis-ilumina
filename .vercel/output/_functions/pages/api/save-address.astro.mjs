export { renderers } from '../../renderers.mjs';

const POST = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  if (!data.email || !data.address) {
    return new Response(
      JSON.stringify({ success: false, message: "Faltan campos requeridos" }),
      { status: 400 }
    );
  }
  data.timestamp = (/* @__PURE__ */ new Date()).toISOString();
  try {
    const GOOGLE_SCRIPT_URL = "TU_URL_DEPLOYED_SCRIPT";
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      body: JSON.stringify(data)
    });
    const result = await response.json();
    if (!result.success) {
      throw new Error(result.message || "Error al guardar en Google Sheets");
    }
    return new Response(
      JSON.stringify({
        success: true,
        message: "Datos guardados y correo enviado exitosamente"
      }),
      { status: 200 }
    );
  } catch (error) {
    let errorMessage = "Error al guardar en Google Sheets";
    if (error instanceof Error) {
      console.error(error);
      errorMessage = error.message;
    } else {
      console.error("Error inesperado", error);
    }
    return new Response(
      JSON.stringify({
        success: false,
        message: errorMessage
      }),
      { status: 500 }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
