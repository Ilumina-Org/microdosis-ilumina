interface PackageData {
  id: string;
  title: string;
  price: number;
  originalPrice: number;
  savings: string;
  description: string;
  quantity: number;
}

export async function getPackageData(
  id: string | undefined,
): Promise<PackageData> {
  const packages: { [key: string]: PackageData } = {
    "1": {
      id: "1",
      title: "1 Mes de Suministro",
      price: 160.0,
      originalPrice: 480.0,
      savings: "67%",
      description: "Incluye envío estándar gratuito...",
      quantity: 1,
    },
    "2": {
      id: "2",
      title: "Paquete de 3 Meses",
      price: 390.0,
      originalPrice: 480.0,
      savings: "19%",
      description: "Incluye envío prioritario gratuito...",
      quantity: 1,
    },
  };

  if (!id || !packages[id]) {
    throw new Error("NOT_FOUND");
  }

  return packages[id];
}
