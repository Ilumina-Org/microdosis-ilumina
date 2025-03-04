import React, { useEffect, useRef, useState } from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";

const MercadoPagoCheckoutPro = ({ product_data }: { product_data: any }) => {
  const [preferenceId, setPreferenceId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const initialized = useRef(false);

  useEffect(() => {
    const controller = new AbortController();
    let isMounted = true;

    const initializePayment = async () => {
      try {
        if (!initialized.current) {
          initMercadoPago(import.meta.env.PUBLIC_MERCADOPAGO_PUBLIC_KEY, {
            locale: "es-PE",
          });
          initialized.current = true;
        }

        const response = await fetch("/api/create-preference", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(product_data),
          signal: controller.signal,
        });

        const data = await response.json();
        if (!data.id) throw new Error("Error al crear preferencia");

        if (isMounted) {
          setPreferenceId(data.id);
        }
      } catch (err) {
        if (isMounted && !controller.signal.aborted) {
          setError(err instanceof Error ? err.message : "Error desconocido");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    initializePayment();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [product_data]);

  if (loading) return <div>Cargando pasarela de pago...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="mercado-pago-container">
      {preferenceId && <Wallet initialization={{ preferenceId }} />}
    </div>
  );
};

export default MercadoPagoCheckoutPro;
