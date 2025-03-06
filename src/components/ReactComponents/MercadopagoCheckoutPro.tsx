// MercadoPagoCheckoutPro.tsx - Componente actualizado
import React, { useEffect, useRef, useState } from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { Cup } from "iconsax-react";

interface ProductData {
  title: string;
  price: number;
  quantity: number;
}

const MercadoPagoCheckoutPro = ({
  product_data,
}: {
  product_data: ProductData;
}) => {
  const [preferenceId, setPreferenceId] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const initialized = useRef(false);

  useEffect(() => {
    const controller = new AbortController();

    const initializePayment = async () => {
      try {
        if (!initialized.current) {
          initMercadoPago(import.meta.env.PUBLIC_MERCADOPAGO_PUBLIC_KEY, {
            locale: "es-PE",
            advancedFraudPrevention: true,
          });
          initialized.current = true;
        }

        const response = await fetch("/api/create-preference", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            items: [
              {
                title: product_data.title,
                unit_price: product_data.price,
                quantity: product_data.quantity,
              },
            ],
          }),
          signal: controller.signal,
        });
        const { id } = await response.json();
        if (!id) throw new Error("Error al crear preferencia");

        setPreferenceId(id);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
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
        />
      )}
    </div>
  );
};

export default MercadoPagoCheckoutPro;
