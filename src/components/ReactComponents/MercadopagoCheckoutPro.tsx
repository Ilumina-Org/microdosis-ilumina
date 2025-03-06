import React, { useEffect, useRef, useState } from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";

interface ProductData {
  name: string;
  price: number;
  quantity: number;
  district: string;
}

const MercadoPagoCheckoutPro = ({
  product_data,
}: {
  product_data: ProductData;
}) => {
  const [preferenceId, setPreferenceId] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const initializePayment = async () => {
      try {
        initMercadoPago(import.meta.env.PUBLIC_MERCADOPAGO_PUBLIC_KEY, {
          locale: "es-PE",
          advancedFraudPrevention: true,
        });

        const response = await fetch("/api/create-preference", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: product_data.name,
            price: product_data.price,
            quantity: product_data.quantity,
            district: product_data.district,
          }),
          signal: controller.signal,
        });

        const { id } = await response.json();
        if (!id) throw new Error("No se pudo iniciar el pago");

        setPreferenceId(id);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    initializePayment();
    return () => controller.abort();
  }, [product_data]);

  if (loading) return <div>Cargando pasarela de pago...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="mercado-pago-container">
      {preferenceId && (
        <Wallet
          initialization={{
            preferenceId: preferenceId,
            redirectMode: "self",
          }}
          customization={{
            visual: {
              buttonBackground: "default",
              buttonHeight: "48px",
            },
          }}
        />
      )}
    </div>
  );
};

export default MercadoPagoCheckoutPro;
