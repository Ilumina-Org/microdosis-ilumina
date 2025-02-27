import React, { useState } from "react";

interface PricingCardProps {
  productTitle: string;
  initialStock: number;
}

const PricingCard = ({ productTitle, initialStock }: PricingCardProps) => {
  const [stock, setStock] = useState(initialStock);

  const handleButtonClick = () => {
    if (stock > 0) {
      setStock(stock - 1);
      alert(`Has comprado ${productTitle}. Stock restante: ${stock - 1}`);
    } else {
      alert("Producto agotado.");
    }
  };

  return (
    <div>
      <h3>{productTitle}</h3>
      <p>Stock: {stock}</p>
      <button onClick={handleButtonClick} disabled={stock <= 0}>
        {stock > 0 ? "Comprar" : "Agotado"}
      </button>
    </div>
  );
};

export default PricingCard;
