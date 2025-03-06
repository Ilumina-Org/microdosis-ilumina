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

export function getCulqiLink(districtCode: string): string {
  if (CULQI_PLANS[districtCode]) {
    return CULQI_PLANS[districtCode];
  }

  return CULQI_PLANS["DEFAULT"] || "";
}

export const CULQI_PLANS: { [key: string]: string } = {
  LIM01:
    "https://subscriptions.culqi.com/onboarding?id=24440d27-e3af-429f-b78e-c522d2012a23",
  MIRA: "https://subscriptions.culqi.com/onboarding?id=24440d27-e3af-429f-b78e-c522d2012a23",
  BARR: "https://subscriptions.culqi.com/onboarding?id=24440d27-e3af-429f-b78e-c522d2012a23",
  SURC: "https://subscriptions.culqi.com/onboarding?id=24440d27-e3af-429f-b78e-c522d2012a23",
  SANI: "https://subscriptions.culqi.com/onboarding?id=24440d27-e3af-429f-b78e-c522d2012a23",
  DEFAULT:
    "https://subscriptions.culqi.com/onboarding?id=24440d27-e3af-429f-b78e-c522d2012a23",
};
