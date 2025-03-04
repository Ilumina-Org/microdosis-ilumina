"use client";
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
}: ProductContainerProps) {
  const [clickCount, setClickCount] = useState(0);
  const [lastEvent, setLastEvent] = useState("");

  const tierHandler = (tier: number) => {
    switch (tier) {
      case 0:
        return "Gold";
      case 1:
        return "Silver";
      case 2:
        return "Bronze";
      default:
        return "Neutral";
    }
  };

  const handleClick = () => {
    setClickCount((prev) => prev + 1);
    setLastEvent("Botón clickeado");
    window.location.href = link;
  };

  const getButtonText = () => {
    if (!stock) return "AGOTADO";
    return tipo === "subscription" ? "Suscripción mensual" : "Comprar ahora";
  };

  return (
    <div style={{ position: "relative", paddingBottom: "3rem" }}>
      <div
        style={{
          background: "white",
          width: "16rem",
          height: "27rem",
          padding: ".75rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          borderRadius: "20px",
          boxShadow: "0px 15px 40px rgb(0, 0, 0, 0.2)",
        }}
      >
        <img
          src={imageUrl}
          alt={productTitle}
          fetchPriority="high"
          width="100%"
          style={{ objectFit: "contain" }}
          height="55%"
        />
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <h3 style={{ fontSize: "23px", margin: 0 }}>{productTitle}</h3>
          <p style={{ fontSize: "15px", margin: 0 }}>{productDetail}</p>
          <p style={{ fontSize: "30px", margin: 0 }}>{productPrice}</p>
          {productDeal && (
            <p style={{ fontSize: "15px", margin: 0, color: "green" }}>
              {productDeal}
            </p>
          )}
          <button
            style={{
              width: "fit-content",
              padding: "1rem",
              background: stock ? "#C1DC3A" : "#ccc",
              borderRadius: "10px",
              border: "none",
              cursor: stock ? "pointer" : "not-allowed",
              opacity: stock ? 1 : 0.7,
            }}
            onClick={handleClick}
          >
            {getButtonText()}
          </button>
        </div>
      </div>

      {/* Debug visual */}
      <div
        style={{
          position: "absolute",
          bottom: "-3rem",
          width: "100%",
          backgroundColor: "black",
          color: "lime",
          padding: "0.5rem",
          fontSize: "12px",
          borderRadius: "5px",
          textAlign: "left",
        }}
      >
        <strong>🛠 Debug Info</strong>
        <p>Clicks: {clickCount}</p>
        <p>Último evento: {lastEvent}</p>
        <p>Stock: {stock ? "✅ Disponible" : "❌ Agotado"}</p>
        <p>Tipo: {tipo}</p>
        <p>SKU: {sku}</p>
        <p>Tier: {tierHandler(tier)}</p>
      </div>
    </div>
  );
}
