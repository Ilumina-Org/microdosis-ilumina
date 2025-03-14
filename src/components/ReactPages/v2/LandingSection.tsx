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
      const productsSection = document.getElementById("products-section");
      if (productsSection) {
        productsSection.scrollIntoView({ behavior: "smooth" });
      }
    };

    return (
      <section id={props.id} ref={ref} className="landing-section">
        <div className="landing-container">
          <div className="logo">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.0"
              width="300.000000pt"
              height="129.000000pt"
              viewBox="0 0 300.000000 129.000000"
              preserveAspectRatio="xMidYMid meet"
            >
              <metadata>
                Created by potrace 1.10, written by Peter Selinger 2001-2011
              </metadata>
              <g
                transform="translate(0.000000,129.000000) scale(0.100000,-0.100000)"
                fill="#ffffff"
                stroke="none"
              >
                <path d="M634 1049 c-4 -7 -12 -30 -19 -52 -6 -22 -18 -41 -26 -42 -8 -1 -68 -8 -134 -14 -149 -15 -155 -17 -126 -37 19 -13 39 -15 137 -7 62 4 114 6 114 3 1 -3 -27 -96 -62 -208 -58 -186 -65 -203 -88 -208 -82 -18 -118 -36 -129 -62 -31 -80 3 -131 73 -111 39 11 71 42 113 112 26 42 42 57 59 58 13 1 27 2 32 3 4 1 38 6 77 10 84 10 115 21 115 41 0 12 -5 13 -17 7 -21 -10 -212 -37 -218 -30 -2 2 25 92 60 199 l64 194 103 2 c57 0 104 4 106 7 2 4 -3 22 -10 42 -10 29 -16 34 -38 30 -66 -12 -140 -17 -140 -8 0 5 11 26 25 46 l24 36 -44 0 c-24 0 -47 -5 -51 -11z m-194 -595 c0 -17 -57 -94 -78 -105 -19 -11 -25 -10 -39 3 -13 14 -14 21 -4 46 9 21 24 33 59 44 55 19 62 20 62 12z" />
                <path d="M961 973 c-5 -10 -19 -52 -31 -93 -12 -41 -44 -144 -71 -227 -51 -160 -57 -191 -37 -211 30 -30 43 -13 70 101 32 131 132 420 147 425 26 9 8 22 -29 22 -27 0 -42 -5 -49 -17z" />
                <path d="M1841 890 l-19 -40 32 0 c27 0 37 7 59 40 l26 40 -39 0 c-36 0 -41 -3 -59 -40z" />
                <path d="M1626 776 c-24 -33 -55 -79 -70 -101 l-28 -40 7 35 c4 19 16 53 26 76 20 49 10 67 -32 59 -30 -6 -65 -47 -131 -153 -28 -45 -53 -80 -55 -78 -8 7 58 194 72 206 8 7 15 16 15 21 0 11 -60 12 -76 1 -6 -4 -22 -43 -34 -87 -13 -44 -33 -100 -46 -125 -38 -77 -84 -111 -84 -62 0 33 80 247 97 259 24 18 11 24 -32 15 -38 -7 -39 -9 -80 -112 -22 -58 -52 -118 -65 -133 -26 -29 -57 -36 -66 -13 -7 19 33 179 56 229 l18 37 -23 0 c-46 0 -55 -11 -85 -108 -36 -115 -40 -196 -11 -212 35 -18 63 -11 97 27 33 36 34 36 34 12 0 -50 47 -65 93 -29 33 26 40 25 33 -5 -9 -34 9 -65 38 -65 19 0 25 7 30 33 7 37 126 244 155 271 16 15 14 4 -12 -82 -17 -55 -28 -106 -24 -114 9 -25 52 -10 72 25 42 72 126 199 130 196 2 -3 -12 -48 -31 -103 -36 -104 -42 -144 -22 -164 22 -22 46 -12 84 33 20 25 39 45 43 45 4 0 5 -18 3 -40 -4 -35 -2 -40 23 -46 23 -6 33 0 70 42 47 52 52 50 33 -20 -14 -52 -1 -76 38 -76 18 0 24 5 24 23 0 26 127 237 167 277 l24 25 -7 -30 c-4 -16 -17 -55 -30 -85 -30 -77 -37 -115 -24 -139 19 -36 55 -26 91 24 38 52 49 56 49 16 0 -67 71 -83 124 -28 17 17 39 43 47 57 16 24 16 24 12 -27 -5 -49 -4 -52 20 -58 34 -9 36 -7 107 80 46 56 57 75 43 75 -11 0 -34 -24 -58 -60 -39 -59 -55 -72 -55 -48 0 30 74 232 91 249 26 26 24 29 -17 27 -30 -1 -40 -7 -57 -36 l-20 -34 -12 30 c-27 62 -104 42 -161 -42 -19 -28 -34 -56 -34 -62 0 -13 -97 -137 -111 -142 -16 -6 -10 15 36 144 25 68 43 129 40 134 -11 18 -59 -2 -98 -38 -20 -20 -60 -72 -89 -114 -28 -43 -53 -76 -55 -74 -7 7 46 165 68 204 l18 32 -32 0 c-18 0 -37 -4 -43 -8 -6 -4 -21 -41 -33 -82 -21 -70 -74 -155 -118 -192 -15 -12 -16 -9 -11 22 4 20 26 86 50 148 l45 111 -31 -4 c-17 -2 -34 -4 -37 -4 -4 -1 -20 -40 -38 -88 -24 -69 -42 -100 -82 -143 l-51 -55 7 39 c4 22 25 88 47 148 22 59 38 114 35 122 -3 7 -17 14 -32 14 -20 0 -35 -13 -69 -62z m762 -18 c7 -7 12 -22 12 -34 0 -29 -52 -128 -97 -182 -29 -35 -38 -41 -50 -31 -27 23 14 156 68 222 32 39 47 45 67 25z" />
              </g>
            </svg>
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
