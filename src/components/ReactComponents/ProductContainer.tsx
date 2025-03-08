import React, { useState } from "react";
import "./ProductContainer.css";

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
    0: "radial-gradient(ellipse farthest-corner at right bottom, #FEDB37 0%, #FDB931 4%, #9f7928 15%, #8A6E2F 20%, transparent 50%), radial-gradient(ellipse farthest-corner at left top, #FFFFFF 0%, #FFFFAC 4%, #D1B464 12.5%, #5d4a1f 31.25%, #5d4a1f 40%)",
    1: "linear-gradient(-40deg,#dedede,#ffffff 8%,#dedede 10.5%,#ffffff 12%,#454545 13.5%,#dedede 18%,#ffffff 22.5%,#ffffff 30%,#dedede 36%,#ffffff 40%,#dedede 42%,#a1a1a1)",
    2: "linear-gradient(-72deg, #ca7345, #ffdeca 8%, #ca7345 10.5%, #ffdeca 12%, #a14521 13.5%, #ca7345 18%, #ffdeca 22.5%, #ffdeca 30%, #ca7345 36%, #ffdeca 40%, #ca7345 42%, #732100)",
  };

  const dynamicStyles = {
    //@ts-ignore
    background: tierStyles[tier] || "",
    transform: isHovered ? "translateY(-10px)" : "translateY(0)",
    boxShadow: isHovered
      ? "0px 20px 50px rgba(0, 0, 0, 0.3)"
      : "0px 15px 40px rgba(0, 0, 0, 0.2)",
  };

  const buttonStyles = {
    background: stock ? "#C1DC3A" : "#ccc",
    cursor: stock ? "pointer" : "not-allowed",
    opacity: stock ? 1 : 0.7,
  };

  const handleClick = () => {
    if (stock) window.location.href = link;
  };

  return (
    <div
      className="product-container"
      style={dynamicStyles}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="product-content">
        <img src={imageUrl} alt={productTitle} className="product-image" />

        <div className="product-info">
          <h3 className="product-title">{productTitle}</h3>
          <p className="product-detail">{productDetail}</p>
          <p className="product-price">{productPrice}</p>

          {productDeal && <p className="product-deal">{productDeal}</p>}

          <button
            className="product-button"
            style={buttonStyles}
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
