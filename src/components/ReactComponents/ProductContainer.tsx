import React, { useState } from "react";

interface ProductContainerProps {
  sku: string;
  link?: string;
  imageUrl?: string;
  productTitle: string;
  productDetail: string;
  productPrice: string;
  productDeal?: string;
  tier: number;
  stock: boolean;
  tipo?: "package" | "subscription";
  onClickHandler?: (link: string) => void; // Agregamos prop opcional
}

export default function ProductContainer({
  sku,
  link = `/microdosis-package/${sku}`,
  imageUrl = `/products/${sku}-card.svg`,
  productTitle,
  productDetail,
  productPrice,
  productDeal = "",
  tier = 0,
  stock = true,
  tipo = "package",
  onClickHandler, // Nuevo prop
}: ProductContainerProps) {
  const [clicks, setClicks] = useState(0);
  const [lastEvent, setLastEvent] = useState<string>("Ninguno");

  const handleClick = () => {
    if (!stock) {
      console.log("❌ Producto agotado. No se puede comprar.");
      return;
    }

    // Incrementamos clicks local
    setClicks((prev) => prev + 1);

    // Establecemos último evento
    setLastEvent(`Clicked SKU: ${sku} - Link: ${link}`);

    // Si se provee un handler personalizado, lo usamos
    if (onClickHandler) {
      onClickHandler(link);
    } else {
      // Comportamiento por defecto
      console.log(`🔗 Redirigiendo a: ${link}`);
      window.location.href = link;
    }
  };

  return (
    <div
      style={{
        background: "linear-gradient(to right, #e0eafc, #cfdef3)",
        padding: ".5rem",
        borderRadius: "30px",
        boxShadow: "0px 15px 40px rgba(0, 0, 0, 0.2)",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          width: "16rem",
          height: "28rem",
          display: "flex",
          padding: ".75rem",
          flexDirection: "column",
          justifyContent: "space-between",
          borderRadius: "20px",
        }}
      >
        <img src={imageUrl} alt={productTitle} width="100%" height="55%" />
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <h3 style={{ fontSize: "23px" }}>{productTitle}</h3>
          <p>{productDetail}</p>
          <p style={{ fontSize: "30px" }}>{productPrice}</p>
          {productDeal && <p style={{ color: "green" }}>{productDeal}</p>}
          <button
            style={{
              background: stock ? "#C1DC3A" : "#ccc",
              borderRadius: "10px",
              border: "none",
              cursor: stock ? "pointer" : "not-allowed",
              opacity: stock ? 1 : 0.7,
              padding: "1rem",
              fontWeight: "bold",
            }}
            onClick={handleClick}
            disabled={!stock}
          >
            {stock ? "Comprar ahora" : "AGOTADO"}
          </button>
        </div>
      </div>
      <div
        style={{
          marginTop: "1rem",
          fontSize: "12px",
          color: "#666",
          background: "#f4f4f4",
          padding: "0.5rem",
          borderRadius: "10px",
          boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <strong>🛠 Debug Info</strong>
        <p>Clicks: {clicks}</p>
        <p>Último evento: {lastEvent}</p>
        <p>Stock: {stock ? "✅ Disponible" : "❌ Agotado"}</p>
        <p>Tipo: {tipo}</p>
        <p>SKU: {sku}</p>
        <p>Tier: {tier}</p>
      </div>
    </div>
  );
}
