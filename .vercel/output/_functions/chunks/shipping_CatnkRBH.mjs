const DISTRICTS = [
  { code: "LIM01", name: "Lima Cercado" },
  { code: "MIRA", name: "Miraflores" },
  { code: "BARR", name: "Barranco" },
  { code: "SURC", name: "Santiago de Surco" },
  { code: "SANI", name: "San Isidro" }
];
const DISTRICT_SHIPPING_RATES = {
  LIM01: 15,
  MIRA: 15,
  BARR: 15,
  SURC: 15,
  SANI: 15
};
const DEFAULT_SHIPPING_COST = 25;
function calculateShippingCost(district, packageId) {
  if (!district) return DEFAULT_SHIPPING_COST;
  if (DISTRICT_SHIPPING_RATES[district]) {
    return DISTRICT_SHIPPING_RATES[district];
  }
  if (district.startsWith("LIM")) {
    return 15;
  }
  return DEFAULT_SHIPPING_COST;
}

export { DISTRICTS as D, calculateShippingCost as c };
