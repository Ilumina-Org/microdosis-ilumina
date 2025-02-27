import React, { useState, useCallback } from "react";
import { Image } from "astro:assets"; // Importa el componente Image
import styles from "./ProductContainer.module.css";

interface ProductContainerProps {
  imageUrl: string;
  productTitle: string;
  productDetail: string;
  productPrice: string;
  productDeal: string;
  tier: number;
  purchaseType: "subscription" | "one-time";
  initialStock: number;
}

export default function ProductContainer({
  imageUrl,
  productTitle,
  productDetail,
  productPrice,
  productDeal,
  tier,
  purchaseType,
  initialStock,
}: ProductContainerProps) {
  const [stock, setStock] = useState(initialStock);

  const handleButtonClick = useCallback(() => {
    if (stock > 0) {
      setStock((prevStock) => prevStock - 1);
      alert(`Has comprado ${productTitle}. Stock restante: ${stock - 1}`);
    } else {
      alert("Producto agotado.");
    }
  }, [stock, productTitle]);

  const tierHandler = (tier: number) => {
    switch (tier) {
      case 0:
        return "radial-gradient(ellipse farthest-corner at right bottom, #FEDB37 0%, #FDB931 8%, #9f7928 30%, #8A6E2F 40%, transparent 80%), radial-gradient(ellipse farthest-corner at left top, #FFFFFF 0%, #FFFFAC 8%, #D1B464 25%, #5d4a1f 62.5%, #5d4a1f 100%)";
    case 1:
      return "linear-gradient(-40deg,#dedede,#ffffff 16%,#dedede 21%,#ffffff 24%,#454545 27%,#dedede 36%,#ffffff 45%,#ffffff 60%,#dedede 72%,#ffffff 80%,#dedede 84%,#a1a1a1)";
    case 2:
      return "linear-gradient(-72deg, #ca7345, #ffdeca 16%, #ca7345 21%, #ffdeca 24%, #a14521 27%, #ca7345 36%, #ffdeca 45%, #ffdeca 60%, #ca7345 72%, #ffdeca 80%, #ca7345 84%, #732100)";
    default:
      return "";
  }

};
const baseStyle = {
  background: tierHandler(tier),
  padding: ".5rem",
  borderRadius: "30px",
  boxShadow: "0px 10px 40px rgba(0, 0, 0, 0.2)",
};

const innerContainerStyle = {
  backgroundColor: "white",
  width: "16rem",
  height: "26rem",
  display: "flex",
  padding: ".75rem",
  flexDirection: "column",
  justifyContent: "space-between",
  borderRadius: "20px",
};

const imageStyle = {
  width: "100%",
  objectFit: "contain",
};

return (
  <div className={styles.baseStyle} style={{ background: tierHandler(tier) }}>
    <div className={styles.innerContainerStyle}>
      <Image src={imageUrl} alt={productTitle} className={styles.imageStyle} />
      <div className={styles.contentStyle}>
        <div className={styles.textSectionStyle}>
          <h3 className={styles.titleStyle}>{productTitle}</h3>
          <p className={styles.detailStyle}>{productDetail}</p>
          <p className={styles.priceStyle}>{productPrice}</p>
          <p className={styles.dealStyle}>{productDeal}</p>
        </div>
        <p>Stock: {stock}</p>
        <button onClick={handleButtonClick} disabled={stock <= 0}>
          {purchaseType === "subscription" ? "Suscripción" : "Comprar"}
        </button>
      </div>
    </div>
  </div>
);
