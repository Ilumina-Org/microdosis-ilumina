export const INVENTORY_SHEET = "Inventario";
export const ORDERS_SHEET = "Ordenes";

export const fallbackProducts = [
  {
    sku: "5678sku",
    title: "Kit Iniciación Ayahuasca Microdosis",
    productDetail: "Precio Regular $180.00",
    productPrice: "$140.00",
    productDeal: "(Ahorra 22%)",
    stock: true,
    tipo: "package",
    tier: 0,
  },
  {
    sku: "5679sku",
    title: "Kit Premium Equilibrio Mental",
    productDetail: "Precio Regular $290.00",
    productPrice: "$250.00",
    productDeal: "(Ahorra 14%)",
    stock: true,
    tipo: "package",
    tier: 1,
  },
  {
    sku: "5680sku",
    title: "Experiencia Completa Ayahuasca",
    productDetail: "Precio Regular $400.00",
    productPrice: "$360.00",
    productDeal: "(Ahorra 10%)",
    stock: false,
    tipo: "package",
    tier: 2,
  },
];

// Archivo: src/utils/fallbackStockData.js
// Primero, asegúrate de que el archivo fallbackStockData.js tiene la estructura correcta:
// src/utils/fallbackStockData.js

export const fallbackStockData = {
  "5678sku": {
    title: "Kit Iniciación Ayahuasca Microdosis",
    price: 140.0,
    regularPrice: 180.0,
    notas:
      "El Kit de Iniciación Ayahuasca Microdosis es perfecto para principiantes. Incluye todo lo necesario para comenzar tu viaje de autodescubrimiento de manera segura y controlada.",
    disponible: true,
    tipo: "package",
    tier: 0,
  },
  "5679sku": {
    title: "Kit Premium Equilibrio Mental",
    price: 250.0,
    regularPrice: 290.0,
    notas:
      "El Kit Premium Equilibrio Mental ofrece una experiencia más avanzada. Incluye ingredientes de alta calidad y guías detalladas para optimizar tu bienestar mental.",
    disponible: true,
    tipo: "package",
    tier: 1,
  },
  "5680sku": {
    title: "Experiencia Completa Ayahuasca",
    price: 360.0,
    regularPrice: 400.0,
    notas:
      "La Experiencia Completa Ayahuasca es nuestro paquete más completo. Incluye todo lo que necesitas para una experiencia profunda y transformadora.",
    disponible: false,
    tipo: "package",
    tier: 2,
  },
};
