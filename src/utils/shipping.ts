export interface Location {
  code: string;
  name: string;
}

// Distritos de Lima (completo)
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

// Provincias (completo)
export const PROVINCES: Location[] = [
  // Principales capitales
  { code: "AREQ", name: "Arequipa" },
  { code: "CUZC", name: "Cusco" },
  { code: "TRUJ", name: "Trujillo" },
  { code: "PIUR", name: "Piura" },
  { code: "CHIC", name: "Chiclayo" },
  // Más provincias por departamento
  // Lima (provincias)
  { code: "HUACHO", name: "Huacho" },
  { code: "HUARAL", name: "Huaral" },
  { code: "CANETE", name: "Cañete" },
  { code: "HUAURA", name: "Huaura" },
  { code: "YAUYOS", name: "Yauyos" },
  { code: "CANTA", name: "Canta" },
  { code: "HUAROCH", name: "Huarochirí" },
  { code: "OYON", name: "Oyón" },
  { code: "CAJATA", name: "Cajatambo" },
  // Arequipa
  { code: "CAYLL", name: "Caylloma" },
  { code: "CARAV", name: "Caravelí" },
  { code: "CAMANA", name: "Camaná" },
  { code: "CASTI", name: "Castilla" },
  { code: "CONDES", name: "Condesuyos" },
  { code: "ISLAY", name: "Islay" },
  { code: "LAUNI", name: "La Unión" },
  // Cusco
  { code: "ANTA", name: "Anta" },
  { code: "CALCA", name: "Calca" },
  { code: "CANAS", name: "Canas" },
  { code: "CANCH", name: "Canchis" },
  { code: "CHUMBI", name: "Chumbivilcas" },
  { code: "ESPINA", name: "Espinar" },
  { code: "LACONV", name: "La Convención" },
  { code: "PARURO", name: "Paruro" },
  { code: "PAUCAR", name: "Paucartambo" },
  { code: "QUISP", name: "Quispicanchi" },
  { code: "URUBA", name: "Urubamba" },
  // La Libertad
  { code: "ASCOP", name: "Ascope" },
  { code: "BOLOG", name: "Bolívar" },
  { code: "CHEPEN", name: "Chepén" },
  { code: "JULCA", name: "Julcán" },
  { code: "OTUZC", name: "Otuzco" },
  { code: "PACAS", name: "Pacasmayo" },
  { code: "PATAZ", name: "Pataz" },
  { code: "SCHEZ", name: "Sánchez Carrión" },
  { code: "STIAG", name: "Santiago de Chuco" },
  { code: "GCHAO", name: "Gran Chimú" },
  { code: "VIRU", name: "Virú" },
  // Piura
  { code: "AYABA", name: "Ayabaca" },
  { code: "HUANC", name: "Huancabamba" },
  { code: "MORR", name: "Morropón" },
  { code: "PAITA", name: "Paita" },
  { code: "SULLA", name: "Sullana" },
  { code: "TALARA", name: "Talara" },
  { code: "SECHU", name: "Sechura" },
  // Lambayeque
  { code: "FERR", name: "Ferreñafe" },
  { code: "LAMBA", name: "Lambayeque" },
  // Ancash
  { code: "HUARA", name: "Huaraz" },
  { code: "AIJA", name: "Aija" },
  { code: "BOLG", name: "Bolognesi" },
  { code: "CARHU", name: "Carhuaz" },
  { code: "CASMA", name: "Casma" },
  { code: "CORONG", name: "Corongo" },
  { code: "HUARI", name: "Huari" },
  { code: "HUAYL", name: "Huaylas" },
  { code: "MARIS", name: "Mariscal Luzuriaga" },
  { code: "PALLC", name: "Pallasca" },
  { code: "POMAB", name: "Pomabamba" },
  { code: "RCSANT", name: "Recuay" },
  { code: "SANTA", name: "Santa" },
  { code: "SIHUAS", name: "Sihuas" },
  { code: "YUNGAY", name: "Yungay" },
  // Cajamarca
  { code: "CAJAM", name: "Cajamarca" },
  { code: "CAJAB", name: "Cajabamba" },
  { code: "CELEND", name: "Celendín" },
  { code: "CHOTA", name: "Chota" },
  { code: "CONTU", name: "Contumazá" },
  { code: "CUTERV", name: "Cutervo" },
  { code: "HUALGC", name: "Hualgayoc" },
  { code: "JAEN", name: "Jaén" },
  { code: "MIGUE", name: "San Miguel" },
  { code: "SPABL", name: "San Pablo" },
  { code: "SIGNA", name: "Santa Cruz" },
  { code: "SCRUZ", name: "San Ignacio" },
  // Ica
  { code: "ICA", name: "Ica" },
  { code: "CHINC", name: "Chincha" },
  { code: "NAZCA", name: "Nazca" },
  { code: "PALPA", name: "Palpa" },
  { code: "PISCO", name: "Pisco" },
  // Junín
  { code: "HUANC", name: "Huancayo" },
  { code: "CONCP", name: "Concepción" },
  { code: "CHANC", name: "Chanchamayo" },
  { code: "JAUJA", name: "Jauja" },
  { code: "JUNIN", name: "Junín" },
  { code: "SATIP", name: "Satipo" },
  { code: "TARMA", name: "Tarma" },
  { code: "YAULI", name: "Yauli" },
  { code: "CHUPAC", name: "Chupaca" },
  // Tacna
  { code: "TACNA", name: "Tacna" },
  { code: "CANDA", name: "Candarave" },
  { code: "JORGE", name: "Jorge Basadre" },
  { code: "TARATA", name: "Tarata" },
  // Puno
  { code: "PUNO", name: "Puno" },
  { code: "AZANG", name: "Azángaro" },
  { code: "CARAB", name: "Carabaya" },
  { code: "CHUCUI", name: "Chucuito" },
  { code: "HUANC", name: "Huancané" },
  { code: "LAMBA", name: "Lampa" },
  { code: "MELGA", name: "Melgar" },
  { code: "SANROM", name: "San Román" },
  { code: "SANDIA", name: "Sandia" },
  { code: "YUNGU", name: "Yunguyo" },
  { code: "COLLS", name: "El Collao" },
  { code: "MOHO", name: "Moho" },
  // San Martín
  { code: "MOYO", name: "Moyobamba" },
  { code: "BELLA", name: "Bellavista" },
  { code: "DORADO", name: "El Dorado" },
  { code: "HUALLA", name: "Huallaga" },
  { code: "LAMAS", name: "Lamas" },
  { code: "MCACR", name: "Mariscal Cáceres" },
  { code: "PICOTA", name: "Picota" },
  { code: "RIOJA", name: "Rioja" },
  { code: "SMARTN", name: "San Martín" },
  { code: "TOCACH", name: "Tocache" },
];

// Tarifas de envío para distritos de Lima
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

// Tarifas de envío para provincias
export const PROVINCE_SHIPPING_RATES: { [code: string]: number } = {
  // Principales ciudades
  AREQ: 30.0,
  CUZC: 35.0,
  TRUJ: 30.0,
  PIUR: 35.0,
  CHIC: 30.0,
  // Lima provincias
  HUACHO: 25.0,
  HUARAL: 25.0,
  CANETE: 25.0,
  HUAURA: 25.0,
  YAUYOS: 35.0,
  CANTA: 25.0,
  HUAROCH: 25.0,
  OYON: 30.0,
  CAJATA: 30.0,
  // Arequipa
  CAYLL: 35.0,
  CARAV: 35.0,
  CAMANA: 35.0,
  CASTI: 35.0,
  CONDES: 35.0,
  ISLAY: 30.0,
  LAUNI: 35.0,
  // Cusco
  ANTA: 35.0,
  CALCA: 35.0,
  CANAS: 40.0,
  CANCH: 40.0,
  CHUMBI: 40.0,
  ESPINA: 40.0,
  LACONV: 40.0,
  PARURO: 40.0,
  PAUCAR: 40.0,
  QUISP: 40.0,
  URUBA: 35.0,
  // La Libertad
  ASCOP: 30.0,
  BOLOG: 35.0,
  CHEPEN: 30.0,
  JULCA: 35.0,
  OTUZC: 35.0,
  PACAS: 30.0,
  PATAZ: 40.0,
  SCHEZ: 35.0,
  STIAG: 35.0,
  GCHAO: 35.0,
  VIRU: 30.0,
  // Piura
  AYABA: 40.0,
  HUANC: 40.0,
  MORR: 35.0,
  PAITA: 35.0,
  SULLA: 35.0,
  TALARA: 35.0,
  SECHU: 35.0,
  // Lambayeque
  FERR: 30.0,
  LAMBA: 30.0,
  // Ancash
  HUARA: 30.0,
  AIJA: 35.0,
  BOLG: 35.0,
  CARHU: 35.0,
  CASMA: 30.0,
  CORONG: 35.0,
  HUARI: 35.0,
  HUAYL: 35.0,
  MARIS: 35.0,
  PALLC: 35.0,
  POMAB: 35.0,
  RCSANT: 35.0,
  SANTA: 30.0,
  SIHUAS: 35.0,
  YUNGAY: 35.0,
  // Otros departamentos igual estructura
  CAJAM: 35.0,
  ICA: 25.0,
  TACNA: 35.0,
  PUNO: 40.0,
  MOYO: 40.0,
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

  // Provincias principales
  AREQ: "https://subscriptions.culqi.com/onboarding?id=24440d27-e3af-429f-b78e-c522d2012a23",
  CUZC: "https://subscriptions.culqi.com/onboarding?id=24440d27-e3af-429f-b78e-c522d2012a23",
  TRUJ: "https://subscriptions.culqi.com/onboarding?id=24440d27-e3af-429f-b78e-c522d2012a23",
  PIUR: "https://subscriptions.culqi.com/onboarding?id=24440d27-e3af-429f-b78e-c522d2012a23",
  CHIC: "https://subscriptions.culqi.com/onboarding?id=24440d27-e3af-429f-b78e-c522d2012a23",

  // Nota: Si deseas agregar enlaces distintos para cada localidad, puedes añadirlos aquí
};
