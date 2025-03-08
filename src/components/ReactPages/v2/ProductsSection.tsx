import React from "react";
import ProductContainer from "../../ReactComponents/ProductContainer";
import "./ProductsSection.css";

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
  ref: React.Ref<HTMLDivElement>;
}

const ProductsSection = React.forwardRef<HTMLDivElement, ProductsPageProps>(
  (props, ref) => {
    return (
      <section id={props.id} ref={ref} className="products-section">
        <div className="products-container">
          <h2 className="products-title">Paquetes Disponibles</h2>
          <div className="products-grid">
            {props.products.map((product: Product) => (
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
            ))}
          </div>
        </div>
      </section>
    );
  },
);

export default ProductsSection;
