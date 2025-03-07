import React, { useState } from "react";

interface ProductContainerProps {
  sku: string;
  link: string;
  imageUrl: string;
  productTitle: string;
  productDetail: string;
  productPrice: string;
  productDeal?: string;
  tier?: number;
  stock?: boolean;
  purchaseType?: "package" | "subscription";
}

export default function ProductContainer({
  sku,
  link,
  imageUrl,
  productTitle,
  productDetail,
  productPrice,
  productDeal,
  tier = 0,
  stock = true,
  purchaseType = "package",
}: ProductContainerProps) {
  const [isHovered, setIsHovered] = useState(false);

  const tierStyles = {
    0: "radial-gradient(ellipse farthest-corner at right bottom, #FEDB37 0%, #FDB931 8%, #9f7928 30%, #8A6E2F 40%, transparent 80%), radial-gradient(ellipse farthest-corner at left top, #FFFFFF 0%, #FFFFAC 8%, #D1B464 25%, #5d4a1f 62.5%, #5d4a1f 100%)",
    1: "linear-gradient(-40deg,#dedede,#ffffff 16%,#dedede 21%,#ffffff 24%,#454545 27%,#dedede 36%,#ffffff 45%,#ffffff 60%,#dedede 72%,#ffffff 80%,#dedede 84%,#a1a1a1)",
    2: "linear-gradient(-72deg, #ca7345, #ffdeca 16%, #ca7345 21%, #ffdeca 24%, #a14521 27%, #ca7345 36%, #ffdeca 45%, #ffdeca 60%, #ca7345 72%, #ffdeca 80%, #ca7345 84%, #732100)",
  };

  const handleClick = () => {
    if (stock) {
      window.location.href = link;
    }
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: tierStyles[tier] || "",
        padding: ".5rem",
        borderRadius: "30px",
        boxShadow: isHovered
          ? "0px 20px 50px rgba(0, 0, 0, 0.3)"
          : "0px 15px 40px rgba(0, 0, 0, 0.2)",
        transform: isHovered ? "translateY(-10px)" : "translateY(0)",
        transition: "all 0.3s ease-in-out",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          width: "18rem",
          height: "32rem",
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
          </div>
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
            disabled={!stock}
          >
            {purchaseType === "subscription"
              ? "Suscripción mensual"
              : stock
                ? "Comprar ahora"
                : "AGOTADO"}
          </button>
        </div>
      </div>
    </div>
  );
}
