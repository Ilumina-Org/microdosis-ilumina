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
  benefitGeneral?: string;
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
  benefitGeneral,
  tier = 0,
  stock = true,
  purchaseType = "package",
}: ProductContainerProps) {
  const [isHovered, setIsHovered] = useState(false);

  const tierStyles = {
    0: "linear-gradient(-72deg, #FDB931, #FEDB37 8%, #FDB931 10.5%, #FEDB37 12%, #9f7928 13.5%, #FDB931 18%, #FEDB37 22.5%, #FEDB37 30%, #FDB931 36%, #FEDB37 40%, #FDB931 42%, #8A6E2F)",
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
          <p className="benefit-general">{benefitGeneral}</p>
          <p className="product-detail">{productDetail}</p>
          <p className="product-price">Ahora: {productPrice}</p>


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
                ? "Quiero mi kit!"
                : "AGOTADO"}
          </button>
        </div>
      </div>
    </div >
  );
}
