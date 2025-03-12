"use client";

import React, { useEffect, useState } from "react";
import ProductContainer from "../../components/ReactComponents/ProductContainer";
import { SectionLayout } from "../ReactComponents/SectionLayout";
import useResponsiveness from "../../utils/useResponsiveness";
import { useMediaQuery } from "react-responsive";
import { Carousel } from "react-responsive-carousel";

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
    const { mobile, handleResponsiveness } = useResponsiveness();
    let padding = handleResponsiveness(16, 15, 25, 15, undefined);
    const small = useMediaQuery({ query: "(min-width: 1366px)" });
    const [opacityIndex, setOpacityIndex] = useState<number>();
    let headerPadding = handleResponsiveness(
      "10rem",
      "15rem",
      "25rem",
      "35rem",
      ""
    );

    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
      setHasMounted(true);
    }, []);

    if (!hasMounted) {
      return null;
    }

    const handleChange = (index: number) => {
      setOpacityIndex(index);
    };

    return (
      <SectionLayout
        id={props.id}
        ref={ref}
        background="white"
        // horizontalPadding={padding}
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
              // width: "100vw",
              width: "55%",
              paddingRight: headerPadding,
              paddingLeft: headerPadding,
            }}
          >
            Productos y paquetes
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
            <div
              style={{
                height: "auto",
              }}
            >
              <Carousel
                autoPlay={false}
                infiniteLoop={true}
                // interval={2250}
                // centerSlidePercentage={isMobile ? 90 : isTablet ? 70 : 50}
                centerSlidePercentage={
                  mobile ? 100 : handleResponsiveness(25, 26, 18, 15, "")
                }
                showThumbs={false}
                showArrows={false}
                showIndicators={false}
                showStatus={true}
                centerMode={true}
                onChange={(e) => handleChange(e)}
                emulateTouch={true}
                // swipeScrollTolerance={5}
                width={"100vw"}
              >
                {props.products.map((product: Product, index: any) => (
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
                    inView={opacityIndex == index ? true : false}
                  />
                ))}
              </Carousel>
            </div>
          </div>
        </div>
      </SectionLayout>
    );
  }
);

export default Products;
