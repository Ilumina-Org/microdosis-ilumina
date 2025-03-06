export interface Location {
  code: string;
  name: string;
}

// Distritos de Lima
export const DISTRICTS: Location[] = [
  { code: "LIM01", name: "Lima Cercado" },
  { code: "MIRA", name: "Miraflores" },
  { code: "BARR", name: "Barranco" },
  { code: "SURC", name: "Santiago de Surco" },
  { code: "SANI", name: "San Isidro" },
];

// Provincias
export const PROVINCES: Location[] = [
  { code: "AREQ", name: "Arequipa" },
  { code: "CUZC", name: "Cusco" },
  { code: "TRUJ", name: "Trujillo" },
  { code: "PIUR", name: "Piura" },
  { code: "CHIC", name: "Chiclayo" },
];

// Tarifas de envío para distritos de Lima
export const DISTRICT_SHIPPING_RATES: { [code: string]: number } = {
  LIM01: 15.0,
  MIRA: 15.0,
  BARR: 15.0,
  SURC: 15.0,
  SANI: 15.0,
};

// Tarifas de envío para provincias
export const PROVINCE_SHIPPING_RATES: { [code: string]: number } = {
  AREQ: 30.0,
  CUZC: 35.0,
  TRUJ: 30.0,
  PIUR: 35.0,
  CHIC: 30.0,
};

export const DEFAULT_DISTRICT_SHIPPING_COST = 15.0;
export const DEFAULT_PROVINCE_SHIPPING_COST = 30.0;

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

export function calculateProvinceShippingCost(
  province: string | null,
  packageId: string | null,
): number {
  if (!province) return DEFAULT_PROVINCE_SHIPPING_COST;

  if (PROVINCE_SHIPPING_RATES[province]) {
    return PROVINCE_SHIPPING_RATES[province];
  }

  return DEFAULT_PROVINCE_SHIPPING_COST;
}

export function getCulqiLink(locationCode: string): string {
  if (CULQI_PLANS[locationCode]) {
    return CULQI_PLANS[locationCode];
  }
  return CULQI_PLANS["DEFAULT"] || "";
}

export const CULQI_PLANS: { [key: string]: string } = {
  // Distritos
  LIM01:
    "https://subscriptions.culqi.com/onboarding?id=24440d27-e3af-429f-b78e-c522d2012a23",
  MIRA: "https://subscriptions.culqi.com/onboarding?id=24440d27-e3af-429f-b78e-c522d2012a23",
  BARR: "https://subscriptions.culqi.com/onboarding?id=24440d27-e3af-429f-b78e-c522d2012a23",
  SURC: "https://subscriptions.culqi.com/onboarding?id=24440d27-e3af-429f-b78e-c522d2012a23",
  SANI: "https://subscriptions.culqi.com/onboarding?id=24440d27-e3af-429f-b78e-c522d2012a23",

  // Provincias
  AREQ: "https://subscriptions.culqi.com/onboarding?id=24440d27-e3af-429f-b78e-c522d2012a23",
  CUZC: "https://subscriptions.culqi.com/onboarding?id=24440d27-e3af-429f-b78e-c522d2012a23",
  TRUJ: "https://subscriptions.culqi.com/onboarding?id=24440d27-e3af-429f-b78e-c522d2012a23",
  PIUR: "https://subscriptions.culqi.com/onboarding?id=24440d27-e3af-429f-b78e-c522d2012a23",
  CHIC: "https://subscriptions.culqi.com/onboarding?id=24440d27-e3af-429f-b78e-c522d2012a23",

  DEFAULT:
    "https://subscriptions.culqi.com/onboarding?id=24440d27-e3af-429f-b78e-c522d2012a23",
};
