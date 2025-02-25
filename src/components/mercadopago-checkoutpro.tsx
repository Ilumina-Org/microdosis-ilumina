import React, { useEffect, useState } from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";

const MercadoPagoCheckoutPro = ({
  mercado_pago_credentials,
  product_data,
  preferenceId: externalPreferenceId,
}) => {
  const [preferenceId, setPreferenceId] = useState(
    externalPreferenceId || null,
  );
  const [loading, setLoading] = useState(!externalPreferenceId);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initializePayment = async () => {
      try {
        if (!mercado_pago_credentials.public_key) {
          throw new Error("Falta la public key de Mercado Pago");
        }
        await initMercadoPago(mercado_pago_credentials.public_key, {
          locale: "es-AR",
        });

        if (!product_data || externalPreferenceId) return;

        const response = await fetch("/api/create-preference", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(product_data),
        });

        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);

        const data = await response.json();
        if (!data?.id) throw new Error("Formato de respuesta inválido");

        setPreferenceId(data.id);
      } catch (err) {
        console.error("Error:", err);
        setError(err instanceof Error ? err.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    initializePayment();
  }, [mercado_pago_credentials.public_key, externalPreferenceId, product_data]);

  if (loading) return <div>Cargando pasarela de pago...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="mercado-pago-container">
      {preferenceId && (
        <Wallet
          initialization={{ preferenceId }}
          customization={{
            texts: {
              action: "pay",
              valueProp: "security_details",
            },
          }}
        />
      )}
    </div>
  );
};

export default MercadoPagoCheckoutPro;
