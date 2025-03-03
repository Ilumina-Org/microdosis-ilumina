import React, { useEffect, useState } from "react";
import Button from "./Button";
import { ArrowRight } from "iconsax-react";

interface ProductContainerProps {
  sku: string | undefined;
  link: string;
  imageUrl: string | undefined;
  productTitle: string | undefined;
  productDetail: string | undefined;
  productPrice: string | undefined;
  productDeal: string | undefined;
  tier: number;
  purchaseType?: string | undefined;
  initialStock?: boolean | undefined;
}

export default function ProductContainer({
  sku,
  link,
  imageUrl,
  productTitle,
  productDetail,
  productPrice,
  productDeal,
  tier,
  purchaseType,
  initialStock = true,
}: ProductContainerProps) {
  const [stockInfo, setStockInfo] = useState({
    canPurchase: initialStock,
    loading: true,
  });

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

  useEffect(() => {
    const checkRealTimeStock = async () => {
      try {
        const response = await fetch(`/api/check-stock?productId=${sku}`);
        const data = await response.json();
        setStockInfo({
          canPurchase: data.canPurchase,
          loading: false,
        });
      } catch (error) {
        console.error("Error checking stock:", error);
        setStockInfo((prev) => ({ ...prev, loading: false }));
      }
    };

    checkRealTimeStock();
  }, [sku]);

  const handleClick = () => {
    if (!stockInfo.loading && stockInfo.canPurchase) {
      window.location.href = link;
    }
  };

  return (
    <div
      style={{
        background: tierHandler(tier),
        padding: ".5rem",
        borderRadius: "40px",
        boxShadow: "0px 15px 40px rgb(0, 0, 0, 0.2)",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          width: "22rem",
          height: "40rem",
          maxHeight: "35rem",
          display: "flex",
          padding: "1rem",
          flexDirection: "column",
          justifyContent: "space-between",
          borderRadius: "35px",
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
            <h3 style={{ fontSize: "30px", margin: 0, color:'black', fontWeight: '600' }}>{productTitle}</h3>
            <p style={{ fontSize: "20px",  margin: 0, color:'black', fontWeight: '300' }}>{productDetail}</p>
            <p style={{ fontSize: "30px",  margin: 0, color:'black', fontWeight: '600' }}>{productPrice}</p>
            <p style={{ fontSize: "15px",  margin: 0, color:'black', fontWeight: '300' }}>{productDeal}</p>
          </div>

          <Button 
          disabled={stockInfo.loading || !stockInfo.canPurchase}
          onClick={handleClick}
          radius={'20px'}
          size={'.5rem'}
          gap={".5rem"}
          label={stockInfo.loading? "Cargando...": purchaseType === "subscription"? "Suscripción mensual": stockInfo.canPurchase? "Comprar ahora": "AGOTADO"}
          icon={<ArrowRight size={30} color='black' />}
          />
        </div>
      </div>
    </div>
  );
}
