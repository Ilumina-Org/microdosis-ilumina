import { Home3 } from "iconsax-react";
import React, { useEffect, useState } from "react";

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
  link = `/microdosis-package/${sku}`, // Default link generation
  imageUrl = `/src/assets/products/${sku}-card.svg`, // Default image path
  productTitle,
  productDetail,
  productPrice,
  productDeal = "",
  tier = 0,
  stock = true,
  tipo = "package",
}: ProductContainerProps) {
  const [stockInfo, setStockInfo] = useState({
    canPurchase: stock,
    loading: true,
  });

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

  const buttonStyle = {
    width: "fit-content",
    padding: "1rem",
    paddingBottom: ".75rem",
    background: "#C1DC3A",
    paddingTop: ".75rem",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
  };

  useEffect(() => {
    // Initial stock state setup
    setStockInfo({
      canPurchase: stock,
      loading: false,
    });
  }, [stock]);

  const handleClick = () => {
    console.log(`Button clicked for product SKU: ${sku}`);
    if (!stockInfo.loading && stockInfo.canPurchase) {
      window.location.href = link;
    }
  };

  // Determine button text based on stock and type
  const getButtonText = () => {
    if (stockInfo.loading) return "Verificando...";
    if (!stockInfo.canPurchase) return "AGOTADO";
    return tipo === "subscription" ? "Suscripción mensual" : "Comprar ahora";
  };

  console.log("debugging", stockInfo);
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
          height="55%"
          style={{ objectFit: "contain" }}
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
            <h3 style={{ color: "black" }}>
              debug info: {JSON.stringify(stockInfo)}
            </h3>
          </div>
          <button
            style={{
              ...buttonStyle,
              opacity: stockInfo.loading ? 0.7 : 1,
              cursor: !stockInfo.canPurchase ? "not-allowed" : "pointer",
              backgroundColor: !stockInfo.canPurchase
                ? "#ccc"
                : buttonStyle.background,
            }}
            onClick={handleClick}
            disabled={stockInfo.loading || !stockInfo.canPurchase}
          >
            {getButtonText()}
          </button>
        </div>
      </div>
    </div>
  );
}
