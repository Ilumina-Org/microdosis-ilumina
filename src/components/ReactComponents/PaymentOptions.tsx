import React, { useState, useEffect } from "react";
import "./PaymentOptions.css";
import type { JSX } from "astro/jsx-runtime";
import { CULQI_PLANS, getCulqiLink } from "../../utils/shipping";
import { safeRedirect, isValidCulqiUrl } from "../../utils/cookies";

type LocationType = "distrito" | "departamento" | "pais" | null;
type LocationData = Array<{ code: string; name: string }>;

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
  const [shippingType, setShippingType] = useState<LocationType>(null);
  const [districts, setDistricts] = useState<LocationData>([]);
  const [departments, setDepartments] = useState<LocationData>([]);
  const [countries, setCountries] = useState<LocationData>([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [totalPrice, setTotalPrice] = useState(basePrice);
  const [loadingShipping, setLoadingShipping] = useState(false);
  const [shippingCost, setShippingCost] = useState(0);
  const [error, setError] = useState("");
  const [isPaymentInProgress, setIsPaymentInProgress] = useState(false);
  const [activeOption, setActiveOption] = useState<string | null>("culqi-option");

  // Cargar ubicaciones al inicio
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const [districtsResponse, departmentsResponse, countriesResponse] = await Promise.all([
          fetch("/api/districts"),
          fetch("/api/departments"),
          fetch("/api/countries"),
        ]);

        if (!districtsResponse.ok || !departmentsResponse.ok || !countriesResponse.ok) {
          throw new Error("Error al cargar ubicaciones");
        }

        const districtsData = await districtsResponse.json();
        const departmentsData = await departmentsResponse.json();
        const countriesData = await countriesResponse.json();

        setDistricts(districtsData);
        setDepartments(departmentsData);
        setCountries(countriesData);
      } catch (err) {
        setError("Error cargando las ubicaciones. Por favor, intente nuevamente.");
      }
    };
    
    fetchLocations();

    // Verificar si hay un pago pendiente
    const pendingPayment = sessionStorage.getItem("pendingPaymentUrl");
    if (pendingPayment) {
      setIsPaymentInProgress(true);
    }
  }, []);

  // Calcular costo de envío cuando cambia la ubicación
  useEffect(() => {
    if (!selectedLocation || !shippingType) return;

    const controller = new AbortController();
    
    const calculateShipping = async () => {
      setLoadingShipping(true);
      setError("");

      try {
        let endpoint;
        switch (shippingType) {
          case "distrito":
            endpoint = "calculate-shipping";
            break;
          case "departamento":
            endpoint = "calculate-department-shipping";
            break;
          case "pais":
            endpoint = "calculate-country-shipping";
            break;
          default:
            throw new Error("Tipo de ubicación no válido");
        }

        const response = await fetch(
          `/api/${endpoint}?location=${selectedLocation}&packageId=${packageId}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error(`Error en la respuesta: ${response.status}`);
        }

        const data = await response.json();

        if (data.success) {
          setShippingCost(data.shippingCost);
          setTotalPrice(basePrice + data.shippingCost);
        } else {
          setError(data.message || "Error calculando el envío");
        }
      } catch (err: any) {
        if (!controller.signal.aborted) {
          setError(
            "Error calculando el envío: " + (err.message || "Desconocido")
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

  const handleLocationTypeChange = (type: LocationType) => {
    if (!type) return;
    
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
        if (typeof window !== "undefined" && window.gtag) {
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

  // Obtener las opciones de ubicación según el tipo seleccionado
  const getLocationOptions = () => {
    switch (shippingType) {
      case "distrito":
        return districts;
      case "departamento":
        return departments;
      case "pais":
        return countries;
      default:
        return [];
    }
  };

  // Obtener el texto adecuado para el selector de ubicación
  const getLocationLabel = () => {
    switch (shippingType) {
      case "distrito":
        return "Seleccione su distrito:";
      case "departamento":
        return "Seleccione su departamento:";
      case "pais":
        return "Seleccione su país:";
      default:
        return "Seleccione ubicación:";
    }
  };

  const getLocationPlaceholder = () => {
    switch (shippingType) {
      case "distrito":
        return "Seleccione distrito";
      case "departamento":
        return "Seleccione departamento";
      case "pais":
        return "Seleccione país";
      default:
        return "Seleccione ubicación";
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
            className={`location-type-btn ${shippingType === "departamento" ? "active" : ""}`}
            onClick={() => handleLocationTypeChange("departamento")}
            disabled={isPaymentInProgress}
          >
            Envío Departamento
          </button>
          <button
            className={`location-type-btn ${shippingType === "pais" ? "active" : ""}`}
            onClick={() => handleLocationTypeChange("pais")}
            disabled={isPaymentInProgress}
          >
            Envío País
          </button>
        </div>

        {shippingType && (
          <div className="location-selector">
            <label>{getLocationLabel()}</label>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              disabled={loadingShipping || isPaymentInProgress}
            >
              <option value="">{getLocationPlaceholder()}</option>
              {getLocationOptions().map((location) => (
                <option key={location.code} value={location.code}>
                  {location.name}
                </option>
              ))}
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
                width="25"
                height="25"
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
                        →
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
