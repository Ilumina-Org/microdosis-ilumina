"use client";
import React from "react";

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
  const tierHandler = (tier: number) => {
    switch (tier) {
      case 0: // Gold/Premium
        return "radial-gradient(ellipse farthest-corner at right bottom, #FEDB37 0%, #FDB931 8%, #9f7928 30%, #8A6E2F 40%, transparent 80%), radial-gradient(ellipse farthest-corner at left top, #FFFFFF 0%, #FFFFAC 8%, #D1B464 25%, #5d4a1f 62.5%, #5d4a1f 100%)";
      case 1: // Silver
        return "linear-gradient(-40deg,#dedede,#ffffff 16%,#dedede 21%,#ffffff 24%,#454545 27%,#dedede 36%,#ffffff 45%,#ffffff 60%,#dedede 72%,#ffffff 80%,#dedede 84%,#a1a1a1)";
      case 2: // Bronze
        return "linear-gradient(-72deg, #ca7345, #ffdeca 16%, #ca7345 21%, #ffdeca 24%, #a14521 27%, #ca7345 36%, #ffdeca 45%, #ffdeca 60%, #ca7345 72%, #ffdeca 80%, #ca7345 84%, #732100)";
      default:
        return "linear-gradient(to right, #f0f0f0, #ffffff)"; // Neutral fallback
    }
  };

  const handleClick = () => {
    if (stock) {
      window.location.href = link;
    }
  };

  const getButtonText = () => {
    if (!stock) return "AGOTADO";
    return tipo === "subscription" ? "Suscripción mensual" : "Comprar ahora";
  };

  return (
    <div
      style={{
        background: tierHandler(tier),
        padding: ".5rem",
        borderRadius: "30px",
        boxShadow: "0px 15px 40px rgb(0, 0, 0, 0.2)",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          width: "16rem",
          height: "27rem",
          maxHeight: "27rem",
          display: "flex",
          padding: ".75rem",
          flexDirection: "column",
          justifyContent: "space-between",
          borderRadius: "20px",
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
          <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
            <h3 style={{ fontSize: "23px", margin: 0 }}>{productTitle}</h3>
            <p style={{ fontSize: "15px", margin: 0 }}>{productDetail}</p>
            <p style={{ fontSize: "30px", margin: 0 }}>{productPrice}</p>
            {productDeal && (
              <p style={{ fontSize: "15px", margin: 0, color: "green" }}>
                {productDeal}
              </p>
            )}
          </div>
          <button
            style={{
              width: "fit-content",
              padding: "1rem",
              paddingBottom: ".75rem",
              background: stock ? "#C1DC3A" : "#ccc",
              paddingTop: ".75rem",
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
    </div>
  );
}
