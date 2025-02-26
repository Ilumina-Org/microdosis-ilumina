export interface District {
  code: string;
  name: string;
}

export const DISTRICTS: District[] = [
  { code: "LIM01", name: "Lima Cercado" },
  { code: "MIRA", name: "Miraflores" },
  { code: "BARR", name: "Barranco" },
  { code: "SURC", name: "Santiago de Surco" },
  { code: "SANI", name: "San Isidro" },
];

export const DISTRICT_SHIPPING_RATES: { [code: string]: number } = {
  LIM01: 15.0,
  MIRA: 15.0,
  BARR: 15.0,
  SURC: 15.0,
  SANI: 15.0,
};

export const DEFAULT_SHIPPING_COST = 25.0;

export function calculateShippingCost(
  district: string | null,
  packageId: string | null,
): number {
  if (!district) return DEFAULT_SHIPPING_COST;
  if (DISTRICT_SHIPPING_RATES[district]) {
    return DISTRICT_SHIPPING_RATES[district];
  }
  if (district.startsWith("LIM")) {
    return 15.0;
  }
  return DEFAULT_SHIPPING_COST;
}
