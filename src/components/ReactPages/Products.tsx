
import React from "react";
import Layout from "../layouts/Layout.astro";
import { getProducts } from "../../utils/stock";
import ProductContainer from "../../components/ReactComponents/ProductContainer";
import { SectionLayout } from "../../components/ReactComponents/SectionLayout";
import useResponsiveness from "../../utils/useResponsiveness";

let products = [];
let errorMessage = "";
try {
  products = await getProducts();
  products = products.slice(0, 3);
} catch (error) {
  errorMessage = "Hubo un problema al cargar los productos. Intenta más tarde.";
}

interface LandingProps {
  id: string;
  horizontalPadding: string | number;
  ref: React.Ref<HTMLDivElement>;
}


const Products = React.forwardRef<HTMLDivElement, LandingProps>((props, ref) => {
  const { handleResponsiveness } = useResponsiveness();
  let padding = handleResponsiveness([26, 10, 25, 10])


  return (
    <SectionLayout
      id={props.id}
      ref={ref}
      background="white"
      horizontalPadding={padding}
      height="100vh"
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ width: "100%", textAlign: "left", }}>
          <h2 style={{ fontWeight: 300, fontSize: "35px", color: "black" }}>
            Paquetes Disponibles
          </h2>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            gap: "30px",
            flexWrap: "wrap",
          }}
        >
          {
            errorMessage && (
              <p style={{ color: "red", fontSize: "18px" }}>{errorMessage}</p>
            )
          }

          {
            !errorMessage && products.length === 0 && (
              <p style={{ fontSize: "18px" }}>No hay productos disponibles.</p>
            )
          }

          {
            products.map((product) => (
              <ProductContainer
                client:load
                key={product.sku}
                imageUrl={`/products/${product.sku}-card.svg`}
                link={`microdosis-package/${product.sku}`}
                sku={product.sku}
                productTitle={product.title}
                productDetail={product.productDetail}
                productPrice={product.productPrice}
                productDeal={product.productDeal}
                tier={product.tier}
                stock={product.stock}
                purchaseType={product.tipo}
              />
            ))
          }
        </div>
        <style>
          {`
  .container {
    --horizontalPadding: 10rem;
    background: white;
    padding: 2rem;
    padding-right: var(--horizontalPadding);
    padding-left: var(--horizontalPadding);
    scroll-snap-align: start;
  }
  @media (max-width: 768px) {
    .container {
      --horizontalPadding: 2rem;
      padding: 1rem;
    }
}
`}
        </style>
      </div>
    </SectionLayout >
  );
});

export default Products;
