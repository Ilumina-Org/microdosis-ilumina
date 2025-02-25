export async function getMercadoPagoPreference(packageData) {
  try {
    const isServer = typeof window === "undefined";

    const defaultUrl = "http://localhost:4321";

    const baseUrl =
      import.meta.env.PUBLIC_SITE ||
      import.meta.env.SITE ||
      (!isServer ? window.location.origin : defaultUrl);

    const apiUrl = new URL("/api/create-preference", baseUrl).toString();

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: packageData.title,
        price: packageData.price,
        quantity: packageData.quantity || 1,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Error al crear preferencia: ${errorData.error || response.statusText}`,
      );
    }

    const data = await response.json();
    return data.id;
  } catch (error) {
    console.error("Error obteniendo preferencia de MercadoPago:", error);
    throw error;
  }
}
