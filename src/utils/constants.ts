export const INVENTORY_SHEET = "Inventario";

export const fallbackProducts = [
  {
    sku: "5678sku",
    title: "Kit Iniciación Ayahuasca Microdosis",
    productDetail: "Precio Regular S/. 180.00",
    productPrice: "S/. 140.00",
    productDeal: "(Ahorra 22%)",
    stock: true,
    tipo: "package",
    tier: 0,
    beneficio_general:
      "Fórmula ancestral para principiantes con microdosis equilibradas",
    quienes_pueden_usarlo:
      "Personas mayores de 18 años sin condiciones médicas preexistentes",
    uso_diario: "1 a 3 gotas por la mañana",
  },
  {
    sku: "5679sku",
    title: "Kit Premium Equilibrio Mental",
    productDetail: "Precio Regular S/. 290.00",
    productPrice: "S/. 250.00",
    productDeal: "(Ahorra 14%)",
    stock: true,
    tipo: "package",
    tier: 1,
    beneficio_general: "Mejora concentración y calidad del sueño",
    quienes_pueden_usarlo:
      "Adultos con estrés laboral o estudiantes universitarios",
    uso_diario: "2 gotas al despertar y 2 antes de dormir",
  },
  {
    sku: "5680sku",
    title: "Experiencia Completa Ayahuasca",
    productDetail: "Precio Regular S/. 400.00",
    productPrice: "S/. 360.00",
    productDeal: "(Ahorra 10%)",
    stock: false,
    tipo: "package",
    tier: 2,
    beneficio_general: "Transformación espiritual profunda",
    quienes_pueden_usarlo: "Usuarios experimentados con guía certificada",
    uso_diario: "Solo bajo supervisión durante ceremonias",
  },
];

export const fallbackStockData = {
  "5678sku": {
    title: "Kit Iniciación Ayahuasca Microdosis",
    price: 140.0,
    regularPrice: 180.0,
    notas:
      "Fórmula ancestral para principiantes con microdosis equilibradas. Incluye guía de inicio y soporte básico.",
    disponible: true,
    tipo: "package",
    tier: 0,
    beneficio_general:
      "Fórmula ancestral para principiantes con microdosis equilibradas",
    quienes_pueden_usarlo:
      "Personas mayores de 18 años sin condiciones médicas preexistentes",
    uso_diario: "1 a 3 gotas por la mañana",
  },
  "5679sku": {
    title: "Kit Premium Equilibrio Mental",
    price: 250.0,
    regularPrice: 290.0,
    notas:
      "Mezcla tradicional purificada para uso diario. Mejora concentración y calidad del sueño con extracto natural certificado.",
    disponible: true,
    tipo: "package",
    tier: 1,
    beneficio_general: "Mejora concentración y calidad del sueño",
    quienes_pueden_usarlo:
      "Adultos con estrés laboral o estudiantes universitarios",
    uso_diario: "2 gotas al despertar y 2 antes de dormir",
  },
  "5680sku": {
    title: "Experiencia Completa Ayahuasca",
    price: 360.0,
    regularPrice: 400.0,
    notas:
      "Kit completo para 30 días con extracto potenciado. Incluye rituales guiados, gotero premium y asesoramiento personalizado.",
    disponible: false,
    tipo: "package",
    tier: 2,
    beneficio_general: "Transformación espiritual profunda",
    quienes_pueden_usarlo: "Usuarios experimentados con guía certificada",
    uso_diario: "Solo bajo supervisión durante ceremonias",
  },
  "5690sku": {
    title: "Kit Ceremonial Ayahuasca",
    price: 480.0,
    regularPrice: 520.0,
    notas:
      "Nuestra formulación más potente con ingredientes seleccionados de la Amazonía. Incluye certificado de origen, guía ceremonial y soporte prioritario.",
    disponible: false,
    tipo: "package",
    tier: 3,
    beneficio_general: "Transformación espiritual profunda",
    quienes_pueden_usarlo: "Usuarios experimentados con guía certificada",
    uso_diario: "Solo bajo supervisión durante ceremonias",
  },
};
