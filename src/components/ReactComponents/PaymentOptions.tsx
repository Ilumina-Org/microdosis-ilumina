import React, { useState, useEffect } from "react";
import "./PaymentOptions.css";
import type { JSX } from "astro/jsx-runtime";
import { CULQI_PLANS, getCulqiLink } from "../../utils/shipping";
import { safeRedirect, isValidCulqiUrl } from "../../utils/cookies";
interface PaymentOptionsProps {
  basePrice: number;
  title: string;
  packageId: string;
}
const PaymentOptions = ({
  basePrice,
  title,
  packageId,
}: PaymentOptionsProps) => {
  const [shippingType, setShippingType] = useState<
    "distrito" | "departamento" | "internacional" | "local" | null
  >(null);
  const [districts, setDistricts] = useState<
    Array<{ code: string; name: string }>
  >([]);
  const [departments, setDepartments] = useState<
    Array<{ code: string; name: string }>
  >([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [totalPrice, setTotalPrice] = useState(basePrice);
  const [loadingShipping, setLoadingShipping] = useState(false);
  const [shippingCost, setShippingCost] = useState(0);
  const [error, setError] = useState("");
  const [isPaymentInProgress, setIsPaymentInProgress] = useState(false);
  const [activeOption, setActiveOption] = useState<string | null>(
    "culqi-option",
  );
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const [districtsResponse, departmentsResponse] = await Promise.all([
          fetch("/api/districts"),
          fetch("/api/departments"),
        ]);
        const districtsData = await districtsResponse.json();
        const departmentsData = await departmentsResponse.json();
        setDistricts(districtsData);
        setDepartments(departmentsData);
      } catch (err) {
        setError("Error cargando las ubicaciones");
      }
    };
    fetchLocations();
    const pendingPayment = sessionStorage.getItem("pendingPaymentUrl");
    if (pendingPayment) {
      setIsPaymentInProgress(true);
    }
  }, []);
  useEffect(() => {
    const controller = new AbortController();
    const calculateShipping = async () => {
      if (
        !selectedLocation ||
        shippingType === "internacional" ||
        shippingType === "local"
      )
        return;
      setLoadingShipping(true);
      setError("");
      try {
        const endpoint =
          shippingType === "distrito"
            ? "calculate-shipping"
            : "calculate-department-shipping";
        const response = await fetch(
          `/api/${endpoint}?location=${selectedLocation}&packageId=${packageId}`,
          { signal: controller.signal },
        );
        if (!response.ok) {
          throw new Error(`Error en la respuesta: ${response.status}`);
        }
        const data = await response.json();
        if (data.success) {
          setShippingCost(data.shippingCost);
          const newTotal = basePrice + data.shippingCost;
          setTotalPrice(newTotal);
        } else {
          setError(data.message || "Error calculando el envío");
        }
      } catch (err: any) {
        if (!controller.signal.aborted) {
          setError(
            "Error calculando el envío: " + (err.message || "Desconocido"),
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoadingShipping(false);
        }
      }
    };
    calculateShipping();
    return () => controller.abort();
  }, [selectedLocation, packageId, basePrice, shippingType]);

  // Efecto adicional para cuando se selecciona retiro local
  useEffect(() => {
    if (shippingType === "local") {
      setShippingCost(0);
      setTotalPrice(basePrice);
      setSelectedLocation("local");
    }
  }, [shippingType, basePrice]);

  const toggleAccordion = (optionId: string) => {
    setActiveOption((prev) => (prev === optionId ? null : optionId));
  };
  const handleLocationTypeChange = (
    type: "distrito" | "departamento" | "internacional" | "local",
  ) => {
    setShippingType(type);
    setSelectedLocation(type === "local" ? "local" : "");
    setShippingCost(0);
    setError("");
  };
  const handleCulqiPayment = (culqiLink: string) => {
    if (!isValidCulqiUrl(culqiLink)) {
      setError("No se encontró un método de pago válido para esta ubicación");
      return;
    }
    setIsPaymentInProgress(true);
    const redirectSuccess = safeRedirect(culqiLink, "_blank");
    if (redirectSuccess) {
      console.log("Redirección a Culqi exitosa");
      try {
        //@ts-ignore
        if (typeof window !== "undefined" && window.gtag) {
          //@ts-ignore
          window.gtag("event", "payment_initiated", {
            event_category: "payment",
            event_label: selectedLocation,
            value: totalPrice,
          });
        }
      } catch (e) {
        console.error("Error registrando evento de analítica", e);
      }
    } else {
      setIsPaymentInProgress(false);
    }
  };
  const handleWhatsAppContact = () => {
    const message = encodeURIComponent(
      `Hola, estoy interesado en comprar ${title} con envío internacional. ¿Podrían darme más información?`,
    );
    const whatsappUrl = `https://wa.me/+51939114496?text=${message}`;
    window.open(whatsappUrl, "_blank");
    try {
      //@ts-ignore
      if (typeof window !== "undefined" && window.gtag) {
        //@ts-ignore
        window.gtag("event", "international_inquiry", {
          event_category: "contact",
          event_label: "international_shipping",
          value: basePrice,
        });
      }
    } catch (e) {
      console.error("Error registrando evento de analítica", e);
    }
  };

  const handleLocalPickupContact = () => {
    const message = encodeURIComponent(
      `Hola, estoy interesado en comprar ${title} con retiro local. ¿Podrían darme más información sobre la dirección y horarios de retiro?`,
    );
    const whatsappUrl = `https://wa.me/+51939114496?text=${message}`;
    window.open(whatsappUrl, "_blank");
    try {
      //@ts-ignore
      if (typeof window !== "undefined" && window.gtag) {
        //@ts-ignore
        window.gtag("event", "local_pickup_inquiry", {
          event_category: "contact",
          event_label: "local_pickup",
          value: basePrice,
        });
      }
    } catch (e) {
      console.error("Error registrando evento de analítica", e);
    }
  };

  const storeInfo = {
    name: "Tienda Principal - Barranco",
    address: "JR. Tumbes Nr. 279, URB. San Ignacio",
    city: "Lima",
    zipCode: "15047",
    phone: "+51939114496",
    hours: "Lunes a Viernes: 9:00 AM - 6:00 PM | Sábados: 10:00 AM - 2:00 PM",
    reference: "Barranco, Lima, Perú",
  };

  return (
    <div className="payment-section">
      <h2>Método de Pago</h2>
      {isPaymentInProgress && (
        <div className="payment-pending-alert">
          ⚠️ Hay un intento de pago pendiente. Por favor, acepte las cookies
          para continuar.
        </div>
      )}
      {/* Selector de ubicación */}
      <div className="shipping-selector">
        <div className="location-type-buttons">
          <button
            className={`location-type-btn ${shippingType === "local" ? "active" : ""}`}
            onClick={() => handleLocationTypeChange("local")}
            disabled={isPaymentInProgress}
          >
            Retiro Local
          </button>
          <button
            className={`location-type-btn ${shippingType === "distrito" ? "active" : ""}`}
            onClick={() => handleLocationTypeChange("distrito")}
            disabled={isPaymentInProgress}
          >
            Envío Distrito Lima
          </button>
          <button
            className={`location-type-btn ${shippingType === "departamento" ? "active" : ""}`}
            onClick={() => handleLocationTypeChange("departamento")}
            disabled={isPaymentInProgress}
          >
            Envío Departamento
          </button>
          <button
            className={`location-type-btn ${shippingType === "internacional" ? "active" : ""}`}
            onClick={() => handleLocationTypeChange("internacional")}
            disabled={isPaymentInProgress}
          >
            Envío Internacional
          </button>
        </div>
        {shippingType === "local" ? (
          <div className="local-pickup-info">
            <p>
              Puede retirar su producto en nuestra tienda. No hay costo
              adicional de envío.
            </p>
            <div className="store-address-container">
              <div className="store-details">
                <h4>{storeInfo.name}</h4>
                <p>{storeInfo.address}</p>
                <p>
                  {storeInfo.city}, {storeInfo.zipCode}
                </p>
                <p>
                  <strong>Teléfono:</strong> {storeInfo.phone}
                </p>
                <p>
                  <strong>Horario:</strong> {storeInfo.hours}
                </p>
                <p>
                  <strong>Referencia:</strong> {storeInfo.reference}
                </p>
              </div>
            </div>
          </div>
        ) : shippingType === "internacional" ? (
          <div className="international-shipping-info">
            <p>
              Para envíos internacionales, por favor contáctenos directamente:
            </p>
            <button className="contact-button" onClick={handleWhatsAppContact}>
              <span>Consultar por WhatsApp</span>
              <img
                src="/icons/whatsapp_icon.svg"
                width="20px"
                height="20px"
                alt="WhatsApp"
                style={{ marginLeft: "8px" }}
              />
            </button>
          </div>
        ) : (
          shippingType && (
            <div className="location-selector">
              <label>
                {shippingType === "distrito"
                  ? "Seleccione su distrito:"
                  : "Seleccione su departamento:"}
              </label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                disabled={loadingShipping || isPaymentInProgress}
              >
                <option value="">
                  {shippingType === "distrito"
                    ? "Seleccione distrito"
                    : "Seleccione departamento"}
                </option>
                {(shippingType === "distrito" ? districts : departments).map(
                  (location) => (
                    <option key={location.code} value={location.code}>
                      {location.name}
                    </option>
                  ),
                )}
              </select>
            </div>
          )
        )}
        {loadingShipping && (
          <span className="loading">Calculando envío...</span>
        )}
        {shippingCost > 0 &&
          !loadingShipping &&
          shippingType !== "internacional" &&
          shippingType !== "local" && (
            <div className="shipping-cost">
              Costo de envío: S/. {shippingCost.toFixed(2)}
            </div>
          )}
        {shippingType === "local" && (
          <div className="total-price-display">
            Precio total: S/. {basePrice.toFixed(2)}
          </div>
        )}
      </div>
      {shippingType !== "internacional" && selectedLocation && (
        <div className="payment-options">
          {/* Opción: Culqi */}
          <div
            className={`payment-option ${activeOption === "culqi-option" ? "active" : ""}`}
          >
            <div
              className="payment-option-header"
              onClick={() => toggleAccordion("culqi-option")}
            >
              <span className="payment-icon">
                <img
                  src="/icons/culqi_icon.svg"
                  width="25px"
                  height="25px"
                  alt="Culqi"
                />
              </span>
              <span className="payment-title">Culqi</span>
              <span className="toggle-icon">▼</span>
            </div>
            <div className="payment-option-content">
              <div className="culqi-payment">
                <p>
                  Pago seguro con Culqi - Total: S/. {totalPrice.toFixed(2)}
                </p>
                {(() => {
                  const culqiLink =
                    shippingType === "local"
                      ? CULQI_PLANS.local || getCulqiLink("local")
                      : getCulqiLink(selectedLocation);
                  return (
                    <button
                      className={`culqi-button ${!isValidCulqiUrl(culqiLink) || isPaymentInProgress ? "disabled" : ""}`}
                      onClick={() => handleCulqiPayment(culqiLink)}
                      disabled={
                        !isValidCulqiUrl(culqiLink) || isPaymentInProgress
                      }
                    >
                      {isPaymentInProgress
                        ? "Procesando..."
                        : "Pagar con Culqi"}
                      <span className="external-icon" aria-hidden="true">
                        ↗
                      </span>
                    </button>
                  );
                })()}
                <div className="security-info">
                  <span className="lock-icon">🔒</span>
                  <span>Protegido por encriptación SSL de 256-bits</span>
                </div>
                <div className="cookies-info">
                  <small>
                    Este método de pago requiere cookies de terceros. Al hacer
                    clic en "Pagar con Culqi", aceptas el uso de cookies
                    necesarias para procesar el pago.
                  </small>
                </div>
              </div>
            </div>
          </div>
          {error && <div className="error-message">{error}</div>}
        </div>
      )}
    </div>
  );
};
export default PaymentOptions;
