"use client";
import ProductContainer from "../../components/ReactComponents/ProductContainer";
import { SectionLayoutv2 } from "../../components/ReactComponents/SectionLayoutv2";

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
}

const ProductsPage: React.FC<ProductsPageProps> = ({ products }) => {
  return (
    <SectionLayoutv2 id="products" background="blue" height="auto">
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "2rem 1rem",
          alignItems: "center",
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
          {products.map((product: Product) => (
            <ProductContainer
              key={product.sku}
              sku={product.sku}
              link={"microdosis-package/" + product.sku}
              imageUrl={"public/products/" + product.sku + "-card.svg"}
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
    </SectionLayoutv2>
  );
};

export default ProductsPage;
