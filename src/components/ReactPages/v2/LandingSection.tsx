import React, { useRef, useEffect } from "react";
import type { ForwardedRef } from "react";
import { ShoppingCart, ArrowDown2, Whatsapp, Facebook } from "iconsax-react";
import staticImage from "../../../assets/static-flask.png?url";
import { useMediaQuery } from "react-responsive";
import "./LandingSection.css";
import { initializeAnimation } from "../../../utils/appleAnimation";
import Button from "../../ReactComponents/Button";

interface LandingProps {
  id: string;
  [key: string]: any;
}

const LandingSection = React.forwardRef<HTMLElement, LandingProps>(
  (props, ref: ForwardedRef<HTMLElement>) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const small = useMediaQuery({ query: "(max-width: 1399px)" });

    useEffect(() => {
      if (canvasRef.current && !small) {
        initializeAnimation(canvasRef.current);
      }
    }, [small]);

    const handleClick = () => {
      const productsSection = document.getElementById("products");
      if (productsSection) {
        productsSection.scrollIntoView({ behavior: "smooth" });
      }
    };

    return (
      <section id={props.id} ref={ref} className="landing-section">
        <div className="landing-container">
          <div className="logo">
            <p>ILUMINA</p>
          </div>
          <div className="main-content">
            <div className="content fade-in-slide-left">
              <h1>
                Descubre el poder <br /> sanador de la <br />
                <span className="highlight">
                  Ayahuasca <br /> en Microdosis.
                </span>
              </h1>
              <h3>100% ingredientes naturales</h3>
              <Button
                id="toggle-chat"
                label="Comprar ahora"
                onClick={handleClick}
                padding={15}
                styles={
                  {
                    backgroundColor: "#C1DC3A",
                    paddingLeft: "1.5rem",
                    paddingRight: "1.5rem",
                    alignItems: "center",
                    borderRadius: "15px",
                    gap: "15px",
                  } as React.CSSProperties
                }
                icon={
                  <ShoppingCart
                    size={30}
                    color="black"
                    style={{ opacity: "0.5" }}
                  />
                }
              />
            </div>
            <div className="image-container">
              {!small ? (
                <canvas id="model-image" ref={canvasRef}></canvas>
              ) : (
                <img
                  className="fadeInImage"
                  src={staticImage}
                  alt="Ayahuasca microdosis"
                />
              )}
            </div>
          </div>
          <div className="bottom-section">
            <div className="social-buttons">
              <Button
                styles={{ backgroundColor: "white" } as React.CSSProperties}
                icon={<Whatsapp size="40" color="#013726" variant="Bold" />}
                padding={10}
              />
              <Button
                styles={{ backgroundColor: "white" } as React.CSSProperties}
                icon={<Facebook size="40" color="#013726" variant="Bold" />}
                padding={10}
              />
            </div>
            <a className="bottom-action" href="#about">
              <p>Conoce mas sobre la Ayahuasca</p>
              <ArrowDown2 size={30} color="white" style={{ opacity: "50%" }} />
            </a>
          </div>
        </div>
      </section>
    );
  },
);

export default LandingSection;
