export interface Location {
  code: string;
  name: string;
}

// Distritos de Lima (completo - mantenido igual)
export const DISTRICTS: Location[] = [
  // Lima Metropolitana
  { code: "LIM01", name: "Lima Cercado" },
  { code: "MIRA", name: "Miraflores" },
  { code: "BARR", name: "Barranco" },
  { code: "SURC", name: "Santiago de Surco" },
  { code: "SANI", name: "San Isidro" },
  { code: "SJMI", name: "San Juan de Miraflores" },
  { code: "SJLU", name: "San Juan de Lurigancho" },
  { code: "SABO", name: "San Borja" },
  { code: "SLUI", name: "San Luis" },
  { code: "SAMI", name: "San Miguel" },
  { code: "LAMO", name: "La Molina" },
  { code: "LAVI", name: "La Victoria" },
  { code: "JESU", name: "Jesús María" },
  { code: "PLIB", name: "Pueblo Libre" },
  { code: "MAGD", name: "Magdalena del Mar" },
  { code: "BRNA", name: "Breña" },
  { code: "RIMA", name: "Rímac" },
  { code: "ANCON", name: "Ancón" },
  { code: "SMAR", name: "Santa María del Mar" },
  { code: "PUCH", name: "Pucusana" },
  { code: "CHOR", name: "Chorrillos" },
  { code: "INDE", name: "Independencia" },
  { code: "COMAS", name: "Comas" },
  { code: "VMTE", name: "Villa María del Triunfo" },
  { code: "VES", name: "Villa El Salvador" },
  { code: "LURI", name: "Lurigancho" },
  { code: "ANAV", name: "Ate" },
  { code: "CHAR", name: "Chaclacayo" },
  { code: "CINC", name: "Cieneguilla" },
  { code: "PACH", name: "Pachacamac" },
  { code: "LURIN", name: "Lurín" },
  { code: "CALE", name: "Carabayllo" },
  { code: "PNVO", name: "Puente Piedra" },
  { code: "SMP", name: "San Martín de Porres" },
  { code: "LPER", name: "Los Olivos" },
  { code: "SANB", name: "Santa Anita" },
  { code: "SBAR", name: "Santa Rosa" },
  { code: "ELAGU", name: "El Agustino" },
  { code: "SURQ", name: "Surquillo" },
  { code: "LPUN", name: "Punta Hermosa" },
  { code: "PUNT", name: "Punta Negra" },
  { code: "SBART", name: "San Bartolo" },
];

// Departamentos/Regiones (reemplazando provincias)
export const DEPARTMENTS: Location[] = [
  { code: "AMAZ", name: "Amazonas" },
  { code: "ANCA", name: "Áncash" },
  { code: "APURI", name: "Apurímac" },
  { code: "AREQ", name: "Arequipa" },
  { code: "AYAC", name: "Ayacucho" },
  { code: "CAJAM", name: "Cajamarca" },
  { code: "CALL", name: "Callao" },
  { code: "CUSCO", name: "Cusco" },
  { code: "HVANC", name: "Huancavelica" },
  { code: "HUANU", name: "Huánuco" },
  { code: "ICA", name: "Ica" },
  { code: "JUNIN", name: "Junín" },
  { code: "LALIB", name: "La Libertad" },
  { code: "LAMBA", name: "Lambayeque" },
  { code: "LIMA", name: "Lima" },
  { code: "LORET", name: "Loreto" },
  { code: "MADRE", name: "Madre de Dios" },
  { code: "MOQUE", name: "Moquegua" },
  { code: "PASCO", name: "Pasco" },
  { code: "PIURA", name: "Piura" },
  { code: "PUNO", name: "Puno" },
  { code: "SMART", name: "San Martín" },
  { code: "TACNA", name: "Tacna" },
  { code: "TUMBS", name: "Tumbes" },
  { code: "UCAYA", name: "Ucayali" },
];

// Tarifas de envío para distritos de Lima (mantenido igual)
export const DISTRICT_SHIPPING_RATES: { [code: string]: number } = {
  // Lima Metropolitana - tarifa estándar
  LIM01: 15.0,
  MIRA: 15.0,
  BARR: 15.0,
  SURC: 15.0,
  SANI: 15.0,
  SJMI: 15.0,
  SJLU: 15.0,
  SABO: 15.0,
  SLUI: 15.0,
  SAMI: 15.0,
  LAMO: 15.0,
  LAVI: 15.0,
  JESU: 15.0,
  PLIB: 15.0,
  MAGD: 15.0,
  BRNA: 15.0,
  RIMA: 15.0,
  ANCON: 18.0,
  SMAR: 20.0,
  PUCH: 20.0,
  CHOR: 15.0,
  INDE: 15.0,
  COMAS: 18.0,
  VMTE: 18.0,
  VES: 18.0,
  LURI: 18.0,
  ANAV: 18.0,
  CHAR: 20.0,
  CINC: 20.0,
  PACH: 20.0,
  LURIN: 20.0,
  CALE: 18.0,
  PNVO: 18.0,
  SMP: 15.0,
  LPER: 15.0,
  SANB: 18.0,
  SBAR: 20.0,
  ELAGU: 15.0,
  SURQ: 15.0,
  LPUN: 25.0,
  PUNT: 25.0,
  SBART: 25.0,
};

// Tarifas de envío para departamentos (reemplazando provincias)
export const DEPARTMENT_SHIPPING_RATES: { [code: string]: number } = {
  // Departamentos
  AMAZ: 40.0,
  ANCA: 35.0,
  APURI: 40.0,
  AREQ: 30.0,
  AYAC: 40.0,
  CAJAM: 35.0,
  CALL: 15.0,
  CUSCO: 35.0,
  HVANC: 40.0,
  HUANU: 40.0,
  ICA: 25.0,
  JUNIN: 35.0,
  LALIB: 30.0,
  LAMBA: 30.0,
  LIMA: 25.0,
  LORET: 45.0,
  MADRE: 45.0,
  MOQUE: 35.0,
  PASCO: 40.0,
  PIURA: 35.0,
  PUNO: 40.0,
  SMART: 40.0,
  TACNA: 35.0,
  TUMBS: 40.0,
  UCAYA: 45.0,
};

export const DEFAULT_DISTRICT_SHIPPING_COST = 15.0;
export const DEFAULT_DEPARTMENT_SHIPPING_COST = 35.0;

export function calculateShippingCost(
  district: string | null,
  packageId: string | null,
): number {
  if (!district) return DEFAULT_DISTRICT_SHIPPING_COST;
  if (DISTRICT_SHIPPING_RATES[district]) {
    return DISTRICT_SHIPPING_RATES[district];
  }
  if (district.startsWith("LIM")) {
    return 15.0;
  }
  return DEFAULT_DISTRICT_SHIPPING_COST;
}

export function calculateDepartmentShippingCost(
  department: string | null,
  packageId: string | null,
): number {
  if (!department) return DEFAULT_DEPARTMENT_SHIPPING_COST;
  if (DEPARTMENT_SHIPPING_RATES[department]) {
    return DEPARTMENT_SHIPPING_RATES[department];
  }
  return DEFAULT_DEPARTMENT_SHIPPING_COST;
}

export function getCulqiLink(locationCode: string): string {
  if (CULQI_PLANS[locationCode]) {
    return CULQI_PLANS[locationCode];
  }
  return CULQI_PLANS["DEFAULT"] || "";
}

export const CULQI_PLANS: { [key: string]: string } = {
  // Link de pago Culqi (mismo para todos como en tu ejemplo)
  DEFAULT:
    "https://subscriptions.culqi.com/onboarding?id=24440d27-e3af-429f-b78e-c522d2012a23",

  // Distritos Lima
  LIM01:
    "https://subscriptions.culqi.com/onboarding?id=24440d27-e3af-429f-b78e-c522d2012a23",
  MIRA: "https://subscriptions.culqi.com/onboarding?id=24440d27-e3af-429f-b78e-c522d2012a23",
  BARR: "https://subscriptions.culqi.com/onboarding?id=24440d27-e3af-429f-b78e-c522d2012a23",
  SURC: "https://subscriptions.culqi.com/onboarding?id=24440d27-e3af-429f-b78e-c522d2012a23",
  SANI: "https://subscriptions.culqi.com/onboarding?id=24440d27-e3af-429f-b78e-c522d2012a23",
  SJMI: "https://subscriptions.culqi.com/onboarding?id=24440d27-e3af-429f-b78e-c522d2012a23",
  SJLU: "https://subscriptions.culqi.com/onboarding?id=24440d27-e3af-429f-b78e-c522d2012a23",
  SABO: "https://subscriptions.culqi.com/onboarding?id=24440d27-e3af-429f-b78e-c522d2012a23",
  SLUI: "https://subscriptions.culqi.com/onboarding?id=24440d27-e3af-429f-b78e-c522d2012a23",
  SAMI: "https://subscriptions.culqi.com/onboarding?id=24440d27-e3af-429f-b78e-c522d2012a23",

  // Departamentos principales (ejemplos)
  AREQ: "https://subscriptions.culqi.com/onboarding?id=24440d27-e3af-429f-b78e-c522d2012a23",
  CUSCO:
    "https://subscriptions.culqi.com/onboarding?id=24440d27-e3af-429f-b78e-c522d2012a23",
  LALIB:
    "https://subscriptions.culqi.com/onboarding?id=24440d27-e3af-429f-b78e-c522d2012a23",
  PIURA:
    "https://subscriptions.culqi.com/onboarding?id=24440d27-e3af-429f-b78e-c522d2012a23",
  LAMBA:
    "https://subscriptions.culqi.com/onboarding?id=24440d27-e3af-429f-b78e-c522d2012a23",
};
