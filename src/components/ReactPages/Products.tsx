"use client";

import React from "react";
import ProductContainer from "../../components/ReactComponents/ProductContainer";
import { SectionLayout } from "../ReactComponents/SectionLayout";
import useResponsiveness from "../../utils/useResponsiveness";
import { useMediaQuery } from "react-responsive";

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

const Products = React.forwardRef<HTMLDivElement, ProductsPageProps>(
  (props, ref) => {
    const { handleResponsiveness } = useResponsiveness();
    let padding = handleResponsiveness(16, 15, 25, 15, undefined);
    const small = useMediaQuery({ query: "(min-width: 1366px)" });

    return (
      <SectionLayout
        id={props.id}
        ref={ref}
        background="white"
        horizontalPadding={padding}
        verticalPadding={"2rem"}
        height="auto"
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
          <h3
            style={{
              // fontSize: "3vw", //small ? "2.5rem" : "3.5rem",
              fontSize: small ? "3vw" : "2.5rem",
              fontWeight: 200,
              color: "black",
              opacity: 1,
            }}
          >
            Productos
          </h3>
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
            {props.products.map((product: Product) => (
              <div className="product-container-details">
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
                <div style={{ flexDirection: "column" }}>
                  <h3 className="about-title">Descripcion del producto</h3>
                  <h4 className="about-title">
                    Quienes pueden usarlo?
                  </h4>
                  <h5 className="about-text">
                    Por la compra de este product, usted se estará llevando un taller gratuito
                  </h5>
                </div>
              </div>
            ))}
          </div>
        </div >
      </SectionLayout >
    );
  }
);

export default Products;
