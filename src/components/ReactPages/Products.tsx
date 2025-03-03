import React from 'react';
import { SectionLayout } from '../ReactComponents/SectionLayout';
import { getProducts } from "../../utils/stock";
import ProductContainer from "../ReactComponents/ProductContainer";


interface LandingProps {
  id: string;
  horizontalPadding: string | number
  ref: React.Ref<HTMLDivElement>;
}

const Products = React.forwardRef<HTMLDivElement, LandingProps>(async (props, ref) => {
  const products = (await getProducts()).slice(0, 3);

  return (
    <SectionLayout id={props.id} ref={ref} background='white' horizontalPadding={props.horizontalPadding}>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <p style={{ fontSize: '45px', fontWeight: 200, }}>
          Paquetes y ofertas
        </p>
        <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        gap: "35px",
        flexWrap: "wrap",
      }}
    >
      {
        products.map((product) => (
          <ProductContainer
            key={product?.sku}
            sku={product?.sku}
            link={product?.link}
            imageUrl={product?.imageUrl}
            productTitle={product?.title}
            productDetail={product?.productDetail}
            productPrice={product?.productPrice}
            productDeal={product?.productDeal}
            tier={product.tier}
            purchaseType={
              product?.sku.includes("subscription") ? "subscription" : undefined
            }
          />
        ))
      }
    </div>

      </div>
    </SectionLayout>
  );
});

export default Products;