import React, { useEffect, useRef } from "react";
import Button from "../ReactComponents/Button";
import { SectionLayout } from "../ReactComponents/SectionLayout";
import { ShoppingCart, ArrowDown2, Whatsapp, Facebook } from "iconsax-react";
import { initializeAnimation } from "../../utils/appleAnimation";
import useResponsiveness from "../../utils/useResponsiveness";

interface LandingProps {
  id: string;
  ref: React.Ref<HTMLDivElement>;
}

const Landing = React.forwardRef<HTMLDivElement, LandingProps>((props, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { handleResponsiveness, isTablet, isMobile, isSmallMobile } =
    useResponsiveness();

  // Responsive padding based on screen size
  const padding = handleResponsiveness([26, 10, 25, 10]);

  // Responsive font sizes with a 10% increase for mobile
  const mobileScaleFactor = 1.1; // 10% increase for mobile
  const titleSize = handleResponsiveness([
    70,
    60,
    50,
    40 * mobileScaleFactor,
    36 * mobileScaleFactor,
    32 * mobileScaleFactor,
  ]);
  const subtitleSize = handleResponsiveness([
    30,
    25,
    22,
    20 * mobileScaleFactor,
    18 * mobileScaleFactor,
    16 * mobileScaleFactor,
  ]);
  const buttonFontSize = handleResponsiveness([
    30,
    25,
    22,
    20 * mobileScaleFactor,
    18 * mobileScaleFactor,
    16 * mobileScaleFactor,
  ]);

  useEffect(() => {
    if (canvasRef.current) {
      initializeAnimation(canvasRef.current);
    }
  }, []);

  return (
    <SectionLayout
      id={props.id}
      ref={ref}
      minHeight="100vh"
      padding={isMobile || isSmallMobile ? "1.5rem" : "2rem"}
    >
      <div
        style={{
          position: "absolute",
          left: handleResponsiveness([
            "4rem",
            "3rem",
            "2rem",
            "1.5rem",
            "1rem",
            "1rem",
          ]),
          top: handleResponsiveness([
            "2rem",
            "2rem",
            "1.5rem",
            "1.5rem",
            "1rem",
            "1rem",
          ]),
          zIndex: 2,
        }}
      >
        <p
          style={{
            color: "#c1dc3a",
            fontSize: handleResponsiveness([
              "32px",
              "28px",
              "24px",
              "22px",
              "20px",
              "18px",
            ]),
            margin: 0,
            fontWeight: 300,
          }}
        >
          ilumina
        </p>
      </div>

      <div className="landing-content-wrapper">
        <div className="content fade-in-slide-left">
          <h1 style={{ fontSize: `${titleSize}px` }}>
            Descubre el poder <br /> sanador de la <br />
            <span className="highlight">
              Ayahuasca <br /> en Micro dosis.
            </span>
          </h1>
          <h3 style={{ fontSize: `${subtitleSize}px` }}>
            100% ingredientes naturales
          </h3>
          <Button
            id="comprar-button"
            label="Comprar ahora"
            fontSize={buttonFontSize}
            padding={15}
            styles={{
              backgroundColor: "#C1DC3A",
              paddingLeft: "1.5rem",
              paddingRight: "1.5rem",
              alignItems: "center",
              borderRadius: "15px",
              gap: "15px",
              marginTop: "1rem",
            }}
            icon={
              <ShoppingCart
                size={handleResponsiveness([30, 26, 24, 22, 20, 18])}
                color="black"
              />
            }
          />
        </div>

        <div className="image-container">
          {/* Product image */}
          <div className="product-image">
            <img
              src="/api/placeholder/300/500"
              alt="Ayahuasca Microdosis"
              className="bottle-image"
            />
          </div>
        </div>
      </div>

      <a
        className="bottom-action"
        href="#about"
        style={{ textDecoration: "none" }}
      >
        <p>¿Cuál es mi dosis correcta de ayahuasca para sanar?</p>
        <ArrowDown2
          size={handleResponsiveness([30, 26, 24, 22, 20, 18])}
          color="white"
          style={{ opacity: "50%" }}
        />
      </a>

      <div className="social-buttons">
        <Button
          styles={{
            backgroundColor: "transparent",
            border: "none",
            padding: "8px",
          }}
          icon={
            <Facebook
              size={handleResponsiveness([35, 32, 30, 28, 25, 22])}
              color="white"
              variant="Bold"
            />
          }
          padding={5}
        />
        <Button
          styles={{
            backgroundColor: "transparent",
            border: "none",
            padding: "8px",
          }}
          icon={
            <Whatsapp
              size={handleResponsiveness([35, 32, 30, 28, 25, 22])}
              color="white"
              variant="Bold"
            />
          }
          padding={5}
        />
      </div>

      <style jsx>{`
        .landing-content-wrapper {
          display: flex;
          flex-direction: row;
          width: 100%;
          height: 100%;
          min-height: 70vh;
          align-items: center;
          justify-content: space-between;
          margin-top: ${handleResponsiveness([
            "4rem",
            "4rem",
            "3rem",
            "3rem",
            "5rem",
            "5rem",
          ])};
          z-index: 2;
        }

        .content {
          display: flex;
          position: relative;
          flex-direction: column;
          flex: ${isTablet || isMobile || isSmallMobile ? "1" : "0.6"};
          gap: 20px;
          justify-content: center;
          z-index: 2;
          max-width: ${isTablet || isMobile || isSmallMobile ? "100%" : "50%"};
          padding-left: ${handleResponsiveness([
            "2rem",
            "10rem",
            "3rem",
            "2rem",
            "1rem",
            "1rem",
          ])};
        }

        @keyframes fadeInSlideFromLeft {
          0% {
            opacity: 0;
            filter: blur(10px);
          }
          100% {
            opacity: 1;
            filter: blur(0px);
          }
        }

        .fade-in-slide-left {
          animation: fadeInSlideFromLeft 1.5s ease-out forwards;
        }

        h1 {
          font-weight: 800;
          color: white;
          line-height: 98%;
          margin: 0;
        }

        h1 .highlight {
          color: #c1dc3a;
        }

        h3 {
          margin: 0;
          font-weight: 200;
          color: white;
          opacity: 0.5;
        }

        .image-container {
          flex: 1;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          z-index: 2;
          position: relative;
          height: 100%;
        }

        .product-image {
          height: 400px;
          width: 300px;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          margin-right: ${handleResponsiveness([
            "5rem",
            "4rem",
            "3rem",
            "2rem",
            "1rem",
            "1rem",
          ])};
        }

        .bottle-image {
          height: 100%;
          width: auto;
          object-fit: contain;
          transform: scale(1.1);
        }

        .bottom-action {
          position: absolute;
          bottom: ${handleResponsiveness([
            "2rem",
            "2rem",
            "2rem",
            "1.5rem",
            "1.5rem",
            "1rem",
          ])};
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          z-index: 2;
          width: 100%;
          text-align: center;
        }

        .bottom-action > p {
          opacity: 70%;
          font-size: ${handleResponsiveness([
            "18px",
            "16px",
            "16px",
            "14px",
            "14px",
            "13px",
          ])};
          font-weight: 300;
          margin: 0;
          color: white;
          margin-bottom: 0.5rem;
        }

        .social-buttons {
          position: absolute;
          bottom: ${handleResponsiveness([
            "4rem",
            "3.5rem",
            "3rem",
            "2.5rem",
            "2rem",
            "1.5rem",
          ])};
          left: ${handleResponsiveness([
            "4rem",
            "3rem",
            "2rem",
            "1.5rem",
            "1rem",
            "1rem",
          ])};
          display: flex;
          flex-direction: column;
          gap: 10px;
          z-index: 2;
        }

        @media only screen and (max-width: 768px) {
          .landing-content-wrapper {
            flex-direction: column;
            margin-top: 6rem;
          }

          .content {
            padding: 0 ${isSmallMobile ? "0.5rem" : "1rem"};
            scale: ${mobileScaleFactor};
          }

          .image-container {
            display: ${isSmallMobile ? "none" : "flex"};
            justify-content: center;
            margin-top: 2rem;
          }

          .product-image {
            height: ${isSmallMobile ? "300px" : "350px"};
            width: ${isSmallMobile ? "220px" : "250px"};
            margin-right: 0;
          }

          .social-buttons {
            bottom: ${isSmallMobile ? "4rem" : "5rem"};
            left: 1rem;
            flex-direction: row;
          }
        }

        @media only screen and (min-width: 1920px) {
          .content > h1 {
            font-size: 4.5rem;
          }
          .content > h3 {
            font-size: 2rem;
          }
          .product-image {
            height: 500px;
            width: 350px;
          }
        }
      `}</style>
    </SectionLayout>
  );
});

export default Landing;
