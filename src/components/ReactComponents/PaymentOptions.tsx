import React, { useState, useEffect, useRef } from "react";
import MercadoPagoCheckoutPro from "../mercadopago-checkoutpro";
import "./PaymentOptions.css";
import type { JSX } from "astro/jsx-runtime";

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
  const [districts, setDistricts] = useState<
    Array<{ code: string; name: string }>
  >([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [totalPrice, setTotalPrice] = useState(basePrice);
  const [loadingShipping, setLoadingShipping] = useState(false);
  const [shippingCost, setShippingCost] = useState(0);
  const [error, setError] = useState("");

  const [activeOption, setActiveOption] = useState<string | null>(
    "mercadopago-option",
  );
  const [mercadoPagoKey, setMercadoPagoKey] = useState(0);

  const mercadoPagoRef = useRef<{
    price: number;
    district: string;
    instance: JSX.Element | null;
  }>({ price: 0, district: "", instance: null });

  useEffect(() => {
    if (!selectedDistrict) setMercadoPagoKey((prev) => prev + 1);
  }, [selectedDistrict]);

  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        const response = await fetch("/api/districts");
        const data = await response.json();
        setDistricts(data);
      } catch (err) {
        setError("Error cargando los distritos");
      }
    };
    fetchDistricts();
  }, []);
  useEffect(() => {
    const controller = new AbortController();

    const calculateShipping = async () => {
      if (!selectedDistrict) return;

      setLoadingShipping(true);
      try {
        const response = await fetch(
          `/api/calculate-shipping?district=${selectedDistrict}&packageId=${packageId}`,
          { signal: controller.signal },
        );
        const data = await response.json();

        if (data.success) {
          setShippingCost(data.shippingCost);
          const newTotal = basePrice + data.shippingCost;
          setTotalPrice(newTotal);

          if (
            newTotal !== mercadoPagoRef.current.price ||
            selectedDistrict !== mercadoPagoRef.current.district
          ) {
            mercadoPagoRef.current = {
              price: newTotal,
              district: selectedDistrict,
              instance: (
                <MercadoPagoCheckoutPro
                  key={`${newTotal}-${selectedDistrict}`}
                  product_data={{
                    price: newTotal,
                    name: title,
                    quantity: 1,
                    district: selectedDistrict,
                  }}
                />
              ),
            };
          }
        }
      } catch (err) {
        if (!controller.signal.aborted) {
          setError("Error calculando el envío");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoadingShipping(false);
        }
      }
    };

    calculateShipping();
    return () => controller.abort();
  }, [selectedDistrict, packageId, basePrice, title]);

  const toggleAccordion = (optionId: string) => {
    setActiveOption((prev) => (prev === optionId ? null : optionId));
  };

  return (
    <div className="payment-section">
      <h2>Método de Pago</h2>

      {/* Selector de distrito */}
      <div className="shipping-selector">
        <label>Distrito de entrega:</label>
        <select
          value={selectedDistrict}
          onChange={(e) => setSelectedDistrict(e.target.value)}
          disabled={loadingShipping}
        >
          <option value="">Seleccione su distrito</option>
          {districts.map((district) => (
            <option key={district.code} value={district.code}>
              {district.name}
            </option>
          ))}
        </select>
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
        {/* Opción: Mercado Pago */}
        <div
          className={`payment-option ${activeOption === "mercadopago-option" ? "active" : ""}`}
        >
          <div
            className="payment-option-header"
            onClick={() => toggleAccordion("mercadopago-option")}
          >
            <span className="payment-icon">🟡</span>
            <span className="payment-title">Mercado Pago</span>
            <div className="payment-badge">Recomendado</div>
            <span className="toggle-icon">▼</span>
          </div>
          <div className="payment-option-content">
            <div className="mercado-pago-details">
              <p className="payment-description">
                Paga con tarjeta, efectivo o saldo de Mercado Pago
              </p>
              <div className="payment-methods-grid">
                <span className="method-icon">💳</span>
                <span className="method-icon">📱</span>
                <span className="method-icon">💵</span>
              </div>

              {selectedDistrict && mercadoPagoRef.current.instance}

              <div className="security-info">
                <span className="lock-icon">🔒</span>
                <span>Transacción 100% segura</span>
              </div>
            </div>
          </div>
        </div>

        {/* Opción: Tarjeta de Crédito/Débito */}
        <div
          className={`payment-option ${activeOption === "card-option" ? "active" : ""}`}
        >
          <div
            className="payment-option-header"
            onClick={() => toggleAccordion("card-option")}
          >
            <span className="payment-icon">💳</span>
            <span className="payment-title">Tarjeta de Débito/Crédito</span>
            <span className="toggle-icon">▼</span>
          </div>
          <div className="payment-option-content">
            <p className="coming-soon">
              Próximamente: Estamos trabajando en la integración segura de
              tarjetas
            </p>
          </div>
        </div>

        {/* Opción: Culqi */}
        <div
          className={`payment-option ${activeOption === "culqi-option" ? "active" : ""}`}
        >
          <div
            className="payment-option-header"
            onClick={() => toggleAccordion("culqi-option")}
          >
            <span className="payment-icon">⚡</span>
            <span className="payment-title">Culqi</span>
            <span className="toggle-icon">▼</span>
          </div>
          <div className="payment-option-content">
            <p className="coming-soon">Integración con Culqi en desarrollo</p>
          </div>
        </div>
        {/* Opción: Transferencia Bancaria */}
        <div
          className={`payment-option ${activeOption === "transfer-option" ? "active" : ""}`}
        >
          <div
            className="payment-option-header"
            onClick={() => toggleAccordion("transfer-option")}
          >
            <span className="payment-icon">🏦</span>
            <span className="payment-title">Transferencia Bancaria</span>
            <span className="toggle-icon">▼</span>
          </div>
          <div className="payment-option-content">
            <div className="bank-transfer-details">
              <div className="bank-info-item">
                <span className="info-label">Banco:</span>
                <span className="info-value">Banco Nacional</span>
              </div>
              <div className="bank-info-item">
                <span className="info-label">Titular:</span>
                <span className="info-value">Microdosis Ilumina S.A.</span>
              </div>
              <div className="bank-info-item">
                <span className="info-label">CBU/CVU:</span>
                <span className="info-value highlight">
                  0000000000000000000000
                </span>
              </div>
              <div className="bank-info-item">
                <span className="info-label">ALIAS:</span>
                <span className="info-value highlight">MICRODOSIS.ILUMINA</span>
              </div>
              <button className="contact-button">📩 Enviar Comprobante</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentOptions;
