import { c as createAstro, a as createComponent, m as maybeRenderHead, b as renderTemplate, r as renderComponent } from '../chunks/astro/server_CQ3Hs6UC.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_D3zStpAR.mjs';
import 'clsx';
/* empty css                                   */
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
export { renderers } from '../renderers.mjs';

const $$Astro$1 = createAstro("http://localhost:4321");
const $$PaymentInfo = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$PaymentInfo;
  const { paymentId, status, merchantOrderId } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="payment-info" data-astro-cid-4as3berv> <p class="message" data-astro-cid-4as3berv>
Thank you for your purchase. Your payment was successful.
</p> <ul class="details" data-astro-cid-4as3berv> <li data-astro-cid-4as3berv>Payment ID: ${paymentId}</li> <li data-astro-cid-4as3berv>Status: ${status}</li> <li data-astro-cid-4as3berv>Merchant Order ID: ${merchantOrderId}</li> </ul> </div> `;
}, "/home/lucas/code/work/ayahuasca/microdosis-ilumina/src/components/payments/payment-info.astro", void 0);

const shippingSchema = z.object({
  name: z.string().nonempty("Obligatorio").min(2, { message: "Mín. 2 caracteres" }).max(100),
  email: z.string().email({ message: "Email inválido" }).max(100),
  phone: z.string().min(7, { message: "Mín. 7 dígitos" }).max(20).regex(/^[+]?[\d\s()-]{7,20}$/, {
    message: "Formato inválido"
  }),
  address: z.string().min(5, { message: "Mín. 5 caracteres" }).max(200),
  city: z.string().min(2, { message: "Mín. 2 caracteres" }).max(100),
  state: z.string().min(2, { message: "Mín. 2 caracteres" }).max(100),
  zipCode: z.string().min(3, { message: "Mín. 3 caracteres" }).max(20),
  country: z.string().min(2, { message: "Mín. 2 caracteres" }).max(100)
});
const ShippingSection = ({
  paymentId,
  merchantOrderId
}) => {
  const [formStatus, setFormStatus] = useState("editing");
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState(null);
  const STORAGE_KEY = `shipping_${paymentId}`;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(shippingSchema),
    mode: "onBlur"
  });
  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY) === "completed") {
      setFormStatus("success");
      try {
        const savedData = localStorage.getItem(`${STORAGE_KEY}_data`);
        if (savedData) {
          const data = JSON.parse(savedData);
          if (data.shippingAddress) {
            setFormData(data.shippingAddress);
          }
        }
      } catch (e) {
        console.error("Error al recuperar datos guardados:", e);
      }
      return;
    }
    try {
      const savedData = localStorage.getItem(`${STORAGE_KEY}_data`);
      if (savedData) {
        const data = JSON.parse(savedData);
        if (data.shippingAddress) {
          reset(data.shippingAddress);
        }
      }
    } catch (e) {
      console.error("Error al recuperar datos guardados:", e);
    }
  }, [STORAGE_KEY, reset]);
  const onPreSubmit = (data) => {
    setFormData(data);
    setFormStatus("confirming");
  };
  const onConfirmSubmit = async () => {
    if (!formData) return;
    setFormStatus("submitting");
    const backupData = {
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      paymentId,
      merchantOrderId,
      shippingAddress: formData
    };
    localStorage.setItem(`${STORAGE_KEY}_data`, JSON.stringify(backupData));
    try {
      const response = await fetch("/api/save-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          paymentId,
          status: "completed",
          merchantOrderId,
          shippingAddress: formData
        })
      });
      const result = await response.json();
      if (result.success) {
        localStorage.setItem(STORAGE_KEY, "completed");
        setFormStatus("success");
      } else {
        setErrorMessage(result.error || "Error al guardar los datos");
        setFormStatus("error");
      }
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      setErrorMessage(
        "Error de conexión. Verifica tu conexión e intenta nuevamente."
      );
      setFormStatus("error");
    }
  };
  const handleCancelConfirm = () => {
    setFormStatus("editing");
  };
  const handleRetry = () => {
    setFormStatus("editing");
    setErrorMessage("");
  };
  return /* @__PURE__ */ jsxs("div", { className: "shipping-section", children: [
    /* @__PURE__ */ jsx("h2", { className: "shipping-title", children: "Información de envío" }),
    formStatus === "submitting" && /* @__PURE__ */ jsxs("div", { className: "shipping-loading", children: [
      /* @__PURE__ */ jsx("div", { className: "shipping-spinner" }),
      /* @__PURE__ */ jsx("p", { className: "shipping-message", children: "Procesando información..." })
    ] }),
    formStatus === "editing" && /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit(onPreSubmit), className: "shipping-form", children: [
      /* @__PURE__ */ jsx("div", { className: "form-row", children: /* @__PURE__ */ jsxs("div", { className: "form-group", children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "name", children: "Nombre completo *" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            id: "name",
            placeholder: "Tu nombre completo",
            className: errors.name ? "input-error" : "",
            ...register("name")
          }
        ),
        errors.name && /* @__PURE__ */ jsx("span", { className: "error-tooltip", children: errors.name.message })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "form-row", children: /* @__PURE__ */ jsxs("div", { className: "form-group", children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "email", children: "Email *" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            id: "email",
            type: "email",
            placeholder: "ejemplo@correo.com",
            className: errors.email ? "input-error" : "",
            ...register("email")
          }
        ),
        errors.email && /* @__PURE__ */ jsx("span", { className: "error-tooltip", children: errors.email.message })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "form-row", children: /* @__PURE__ */ jsxs("div", { className: "form-group", children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "phone", children: "Teléfono *" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            id: "phone",
            type: "tel",
            placeholder: "+XX XXXX XXXX",
            className: errors.phone ? "input-error" : "",
            ...register("phone")
          }
        ),
        errors.phone && /* @__PURE__ */ jsx("span", { className: "error-tooltip", children: errors.phone.message })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "form-row", children: /* @__PURE__ */ jsxs("div", { className: "form-group", children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "address", children: "Dirección *" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            id: "address",
            placeholder: "Calle, número, piso, depto.",
            className: errors.address ? "input-error" : "",
            ...register("address")
          }
        ),
        errors.address && /* @__PURE__ */ jsx("span", { className: "error-tooltip", children: errors.address.message })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "form-row", children: [
        /* @__PURE__ */ jsxs("div", { className: "form-group half", children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "city", children: "Ciudad *" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              id: "city",
              placeholder: "Ciudad",
              className: errors.city ? "input-error" : "",
              ...register("city")
            }
          ),
          errors.city && /* @__PURE__ */ jsx("span", { className: "error-tooltip", children: errors.city.message })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "form-group half", children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "state", children: "Estado/Provincia *" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              id: "state",
              placeholder: "Provincia",
              className: errors.state ? "input-error" : "",
              ...register("state")
            }
          ),
          errors.state && /* @__PURE__ */ jsx("span", { className: "error-tooltip", children: errors.state.message })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "form-row", children: [
        /* @__PURE__ */ jsxs("div", { className: "form-group half", children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "zipCode", children: "Código Postal *" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              id: "zipCode",
              placeholder: "CP",
              className: errors.zipCode ? "input-error" : "",
              ...register("zipCode")
            }
          ),
          errors.zipCode && /* @__PURE__ */ jsx("span", { className: "error-tooltip", children: errors.zipCode.message })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "form-group half", children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "country", children: "País *" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              id: "country",
              placeholder: "País",
              className: errors.country ? "input-error" : "",
              ...register("country")
            }
          ),
          errors.country && /* @__PURE__ */ jsx("span", { className: "error-tooltip", children: errors.country.message })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "form-controls", children: /* @__PURE__ */ jsx("button", { type: "submit", className: "btn-primary", children: "Confirmar dirección" }) }),
      /* @__PURE__ */ jsx("div", { className: "form-disclaimer", children: "Tus datos se utilizarán únicamente para el envío de tu pedido." })
    ] }),
    formStatus === "confirming" && formData && /* @__PURE__ */ jsx("div", { className: "confirmation-modal", children: /* @__PURE__ */ jsxs("div", { className: "confirmation-content", children: [
      /* @__PURE__ */ jsx("h3", { children: "Confirma tus datos" }),
      /* @__PURE__ */ jsxs("p", { className: "confirmation-warning", children: [
        /* @__PURE__ */ jsx("span", { className: "warning-icon", children: "⚠️" }),
        " Esta información se enviará a nuestro sistema y",
        " ",
        /* @__PURE__ */ jsx("strong", { children: "no podrá ser modificada después" }),
        "."
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "confirmation-data", children: [
        /* @__PURE__ */ jsxs("div", { className: "data-row", children: [
          /* @__PURE__ */ jsx("strong", { children: "Nombre:" }),
          " ",
          formData.name
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "data-row", children: [
          /* @__PURE__ */ jsx("strong", { children: "Email:" }),
          " ",
          formData.email
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "data-row", children: [
          /* @__PURE__ */ jsx("strong", { children: "Teléfono:" }),
          " ",
          formData.phone
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "data-row", children: [
          /* @__PURE__ */ jsx("strong", { children: "Dirección:" }),
          " ",
          formData.address
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "data-row", children: [
          /* @__PURE__ */ jsx("strong", { children: "Ciudad:" }),
          " ",
          formData.city
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "data-row", children: [
          /* @__PURE__ */ jsx("strong", { children: "Estado/Provincia:" }),
          " ",
          formData.state
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "data-row", children: [
          /* @__PURE__ */ jsx("strong", { children: "Código Postal:" }),
          " ",
          formData.zipCode
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "data-row", children: [
          /* @__PURE__ */ jsx("strong", { children: "País:" }),
          " ",
          formData.country
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "confirmation-actions", children: [
        /* @__PURE__ */ jsx("button", { onClick: handleCancelConfirm, className: "btn-secondary", children: "Editar" }),
        /* @__PURE__ */ jsx("button", { onClick: onConfirmSubmit, className: "btn-primary", children: "Confirmar y enviar" })
      ] })
    ] }) }),
    formStatus === "success" && /* @__PURE__ */ jsxs("div", { className: "shipping-success", children: [
      /* @__PURE__ */ jsx("div", { className: "success-icon", children: "✓" }),
      /* @__PURE__ */ jsx("h3", { children: "¡Datos registrados con éxito!" }),
      /* @__PURE__ */ jsx("p", { children: "Tu información de envío ha sido procesada correctamente." }),
      formData && /* @__PURE__ */ jsx("div", { className: "success-data", children: /* @__PURE__ */ jsxs("div", { className: "data-summary", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Nombre:" }),
          " ",
          formData.name
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Email:" }),
          " ",
          formData.email
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Dirección:" }),
          " ",
          formData.address
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Ciudad:" }),
          " ",
          formData.city,
          ", ",
          formData.state
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "payment-info", children: [
        "ID de Pago: ",
        paymentId
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "form-note", children: [
        /* @__PURE__ */ jsx("div", { className: "note-icon", children: "ℹ️" }),
        /* @__PURE__ */ jsx("p", { children: "La información enviada no puede ser modificada, pues ya ha sido registrada en nuestro sistema." })
      ] })
    ] }),
    formStatus === "error" && /* @__PURE__ */ jsxs("div", { className: "shipping-error", children: [
      /* @__PURE__ */ jsx("div", { className: "error-icon", children: "!" }),
      /* @__PURE__ */ jsx("h3", { children: "Ha ocurrido un error" }),
      /* @__PURE__ */ jsx("p", { children: errorMessage || "No pudimos procesar tu información. Por favor intenta nuevamente." }),
      /* @__PURE__ */ jsx("button", { onClick: handleRetry, className: "btn-secondary", children: "Intentar nuevamente" })
    ] })
  ] });
};

const $$Astro = createAstro("http://localhost:4321");
const $$Success = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Success;
  const { searchParams } = Astro2.url;
  const paymentId = searchParams.get("payment_id");
  const status = searchParams.get("status");
  const merchantOrderId = searchParams.get("merchant_order_id");
  if (!paymentId || !status || !merchantOrderId) {
    return new Response(null, {
      status: 302,
      headers: { Location: "/failure" }
    });
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Payment Successful", "data-astro-cid-5y44lzmc": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="container" data-astro-cid-5y44lzmc> <h1 class="title" data-astro-cid-5y44lzmc>Pago exitoso</h1> <div class="card" data-astro-cid-5y44lzmc> ${renderComponent($$result2, "PaymentInfo", $$PaymentInfo, { "paymentId": paymentId, "status": status, "merchantOrderId": merchantOrderId, "data-astro-cid-5y44lzmc": true })} ${renderComponent($$result2, "ShippingSection", ShippingSection, { "client:load": true, "paymentId": paymentId, "merchantOrderId": merchantOrderId, "client:component-hydration": "load", "client:component-path": "/home/lucas/code/work/ayahuasca/microdosis-ilumina/src/components/payments/shipping-section", "client:component-export": "default", "data-astro-cid-5y44lzmc": true })} </div> </main> ` })} `;
}, "/home/lucas/code/work/ayahuasca/microdosis-ilumina/src/pages/success.astro", void 0);

const $$file = "/home/lucas/code/work/ayahuasca/microdosis-ilumina/src/pages/success.astro";
const $$url = "/success";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Success,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
