import { getProducts } from "./stock";

interface PackageData {
  id: string;
  title: string;
  price: number;
  originalPrice: number;
  savings: string;
  description: string;
  imageUrl: string;
  tier: number;
  link: string;
  stock: boolean;
}

export const getPackageData = async (sku: string): Promise<PackageData> => {
  try {
    // Obtener todos los productos con validación de stock
    //
    console.log("sku", sku);
    const products = await getProducts();
    console.log("products", products);
    // Buscar el producto por SKU
    const product = products.find((p) => p.sku === sku);

    if (!product) {
      throw new Error("NOT_FOUND");
    }

    // Validar que el producto tenga stock disponible
    if (!product.stock) {
      throw new Error("OUT_OF_STOCK");
    }

    // Devolver los datos del paquete
    return {
      id: product.sku,
      title: product.title,
      price: parseFloat(product.productPrice.replace("$", "")),
      originalPrice: parseFloat(
        product.productDetail.replace("Precio Regular $", ""),
      ),
      savings: product.productDeal.replace("(Ahorra ", "").replace(")", ""),
      description: "Incluye envío estándar gratuito...", // Puedes personalizar esto
      imageUrl: product.imageUrl,
      tier: product.tier,
      link: product.link,
      stock: product.stock,
    };
  } catch (error) {
    console.error("Error fetching package data:", error);
    if (error instanceof Error) {
      if (error.message === "NOT_FOUND") {
        throw new Error("El paquete no existe.");
      }
      if (error.message === "OUT_OF_STOCK") {
        throw new Error("El paquete no tiene stock disponible.");
      }
    }
    throw new Error("Error inesperado al obtener los datos del paquete.");
  }
};
