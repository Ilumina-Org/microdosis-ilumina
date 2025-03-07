"use client";

import React from "react";
import ProductContainer from "../../components/ReactComponents/ProductContainer";
import { SectionLayout } from "../ReactComponents/SectionLayout";
import useResponsiveness from "../../utils/useResponsiveness";

interface Product {
  sku: string;
  title: string;
  productDetail: string;
  productPrice: string;
  stock: boolean;
  productDeal: string;
  tipo: string;
  tier: number;
}

interface ProductsPageProps {
  products: Product[];
  id: string;
  horizontalPadding?: string | number;
  ref: React.Ref<HTMLDivElement>;
}

const Products = React.forwardRef<HTMLDivElement, ProductsPageProps>((props, ref) => {

  const { handleResponsiveness } = useResponsiveness();
  let padding = handleResponsiveness([16, 10, 25, 10])


  return (
    <SectionLayout
      id={props.id}
      ref={ref}
      background="white"
      horizontalPadding={padding}
      height="100vh"
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "2rem 1rem",
          alignItems: "center",
          gap: "50px",
        }}
      >
        <h2
          style={{
            fontSize: "2rem",
            marginBottom: "2rem",
            textAlign: "center",
          }}
        >
          Paquetes Disponibles
        </h2>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            gap: "30px",
            maxWidth: "1200px",
            width: "100%",
          }}
        >
          {
            props.products.map((product: Product) => (
              <ProductContainer
                key={product.sku}
                sku={product.sku}
                link={"microdosis-package/" + product.sku}
                imageUrl={"products/" + product.sku + "-card.svg"}
                productTitle={product.title}
                productDetail={product.productDetail}
                productPrice={product.productPrice}
                productDeal={product.productDeal}
                stock={product.stock}
                purchaseType={product.tipo as any}
                tier={product.tier}
              />
            ))
          }
        </div >
      </div >
    </SectionLayout >
  );

});


export default Products;
