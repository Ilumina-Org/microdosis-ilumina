import { a as createComponent, m as maybeRenderHead, b as renderTemplate } from '../chunks/astro/server_CQ3Hs6UC.mjs';
import 'kleur/colors';
import 'clsx';
export { renderers } from '../renderers.mjs';

const $$Suscription = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="subscription-section"> <div class="pricing-container"> <h2>Planes de Suscripción Continua</h2> <div class="pricing-cards"> <div class="pricing-card"> <div class="card-content"> <h3>Suscripción Trimestral</h3> <div class="price">$350.00/mes</div> <p class="original-price">Precio Regular $480/mes</p> <p class="savings">(Ahorra 27% cada 3 meses)</p> <ul class="features"> <li>Renovación automática cada 3 meses</li> <li>Envío express gratuito</li> <li>Acceso a comunidad exclusiva</li> <li>2 sesiones de orientación virtual</li> <li>Descuento en talleres presenciales</li> </ul> </div> <button class="buy-button" data-preference-id="PREFERENCE_ID_SUSCRIPCION_TRIMESTRAL">Suscribirse</button> </div> <div class="pricing-card"> <div class="card-content"> <h3>Suscripción Anual</h3> <div class="price">$290.00/mes</div> <p class="original-price">Precio Regular $480/mes</p> <p class="savings">(Ahorra 40% anualmente)</p> <ul class="features"> <li>1 año de suministro continuo</li> <li>Acceso VIP a todos los talleres</li> <li>Sesión privada de orientación</li> <li>Kit completo de bienestar</li> <li>Descuentos exclusivos en retiros</li> <li>Prioridad en nuevos productos</li> </ul> </div> <button class="buy-button" data-preference-id="PREFERENCE_ID_SUSCRIPCION_ANUAL">Suscribirse</button> </div> <div class="pricing-card"> <div class="card-content"> <h3>Suscripción Semestral</h3> <div class="price">$320.00/mes</div> <p class="original-price">Precio Regular $480/mes</p> <p class="savings">(Ahorra 33% cada 6 meses)</p> <ul class="features"> <li>Renovación automática cada 6 meses</li> <li>Envío estándar gratuito</li> <li>Acceso anticipado a productos nuevos</li> <li>1 sesión de orientación virtual</li> <li>Descuentos en eventos especiales</li> </ul> </div> <button class="buy-button" data-preference-id="PREFERENCE_ID_SUSCRIPCION_SEMESTRAL">Suscribirse</button> </div> </div> </div> </section>`;
}, "/home/lucas/code/work/ayahuasca/microdosis-ilumina/src/pages/suscription.astro", void 0);

const $$file = "/home/lucas/code/work/ayahuasca/microdosis-ilumina/src/pages/suscription.astro";
const $$url = "/suscription";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Suscription,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
