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
    "distrito" | "provincia" | null
  >(null);
  const [districts, setDistricts] = useState<
    Array<{ code: string; name: string }>
  >([]);
  const [provinces, setProvinces] = useState<
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
        const [districtsResponse, provincesResponse] = await Promise.all([
          fetch("/api/districts"),
          fetch("/api/provinces"),
        ]);

        const districtsData = await districtsResponse.json();
        const provincesData = await provincesResponse.json();

        setDistricts(districtsData);
        setProvinces(provincesData);
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
      if (!selectedLocation) return;

      setLoadingShipping(true);
      setError("");

      try {
        const endpoint =
          shippingType === "distrito"
            ? "calculate-shipping"
            : "calculate-province-shipping";
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
      } catch (err) {
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

  const toggleAccordion = (optionId: string) => {
    setActiveOption((prev) => (prev === optionId ? null : optionId));
  };

  const handleLocationTypeChange = (type: "distrito" | "provincia") => {
    setShippingType(type);
    setSelectedLocation("");
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
            className={`location-type-btn ${shippingType === "distrito" ? "active" : ""}`}
            onClick={() => handleLocationTypeChange("distrito")}
            disabled={isPaymentInProgress}
          >
            Envío Distrito Lima
          </button>
          <button
            className={`location-type-btn ${shippingType === "provincia" ? "active" : ""}`}
            onClick={() => handleLocationTypeChange("provincia")}
            disabled={isPaymentInProgress}
          >
            Envío Provincia
          </button>
        </div>

        {shippingType && (
          <div className="location-selector">
            <label>
              {shippingType === "distrito"
                ? "Seleccione su distrito:"
                : "Seleccione su provincia:"}
            </label>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              disabled={loadingShipping || isPaymentInProgress}
            >
              <option value="">
                {shippingType === "distrito"
                  ? "Seleccione distrito"
                  : "Seleccione provincia"}
              </option>
              {(shippingType === "distrito" ? districts : provinces).map(
                (location) => (
                  <option key={location.code} value={location.code}>
                    {location.name}
                  </option>
                ),
              )}
            </select>
          </div>
        )}

        {loadingShipping && (
          <span className="loading">Calculando envío...</span>
        )}
        {shippingCost > 0 && !loadingShipping && (
          <div className="shipping-cost">
            Costo de envío: S/ {shippingCost.toFixed(2)}
          </div>
        )}
      </div>

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
            {selectedLocation ? (
              <div className="culqi-payment">
                <p>Pago seguro con Culqi - Total: S/ {totalPrice.toFixed(2)}</p>
                {(() => {
                  const culqiLink = getCulqiLink(selectedLocation);
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
            ) : (
              <p className="select-district-alert">
                ⚠️ Por favor selecciona tu ubicación para mostrar las opciones
                de pago
              </p>
            )}
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}
      </div>
    </div>
  );
};

export default PaymentOptions;
