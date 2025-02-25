export async function getPackageData(id) {
  const packages = {
    "1": {
      id: "1",
      title: "1 Mes de Suministro",
      price: 160.0,
      originalPrice: 480.0,
      savings: "67%",
      description:
        "Incluye envío estándar gratuito, guía de uso personalizado y soporte básico por email.",
      quantity: 1,
    },
    "2": {
      id: "2",
      title: "Paquete de 3 Meses",
      price: 390.0,
      originalPrice: 480.0,
      savings: "19%",
      description:
        "Incluye envío prioritario gratuito, guía avanzada de microdosificación y soporte prioritario por WhatsApp.",
      quantity: 1,
    },
  };

  if (!packages[id]) {
    throw new Error(`Paquete con ID ${id} no encontrado`);
  }

  return packages[id];
}
