import React, { useEffect, useRef } from "react";
import Button from "../ReactComponents/Button";
import { SectionLayout } from "../ReactComponents/SectionLayout";
import { ShoppingCart, ArrowDown2, Whatsapp, Facebook } from "iconsax-react";
import { initializeAnimation } from "../../utils/appleAnimation";
import useResponsiveness from "../../utils/useResponsiveness";
import { useMediaQuery } from "react-responsive";

//now that im using react find a library that can do this easily,
// import animationScript from '../../../public/animation.js';

interface LandingProps {
  id: string;
  //horizontalPadding: any;
  ref: React.Ref<HTMLDivElement>;
}

const Landing = React.forwardRef<HTMLDivElement, LandingProps>((props, ref) => {
  // Use useEffect to run the script after the component mounts
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const desktop = useMediaQuery({ query: "(min-width: 1920px)" });

  useEffect(() => {
    if (canvasRef.current) {
      initializeAnimation(canvasRef.current);
    }
  }, []);

  return (
    <SectionLayout
      id={props.id}
      ref={ref}
      horizontalPadding={desktop ? "25vw" : "20vw"}
    >
      <div
        style={{
          height: "auto",
          position: "absolute",
          left: "4rem",
          top: "2rem",
        }}
      >
        <p style={{ color: "white", fontSize: "50px" }}>ILUMINA</p>
      </div>
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
          fontSize={30}
          padding={15}
          styles={{
            backgroundColor: "#C1DC3A",
            paddingLeft: "1.5rem",
            paddingRight: "1.5rem",
            alignItems: "center",
            borderRadius: "15px",
            gap: "15px",
          }}
          icon={
            <ShoppingCart size={30} color="black" style={{ opacity: "0.5" }} />
          }
        />
      </div>
      <div className="image-container">
        <canvas id="model-image" ref={canvasRef}></canvas>
      </div>
      <a
        className="bottom-action"
        href="#about"
        style={{ textDecoration: "none" }}
      >
        <p>Conoce mas sobre la Ayahuasca</p>
        <ArrowDown2 size={30} color="white" style={{ opacity: "50%" }} />
      </a>

      <div
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "4rem",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <Button
          styles={{ backgroundColor: "white" }}
          icon={<Whatsapp size="40" color="#013726" variant="Bold" />}
          padding={10}
        />
        <Button
          styles={{ backgroundColor: "white" }}
          icon={<Facebook size="40" color="#013726" variant="Bold" />}
          padding={10}
        />
      </div>

      <style>
        {`
            *{
          z-index: 2
          }

          canvas {
            position: absolute;
            bottom: 3rem;
            right: 0rem;
            max-height: 90vh;
            max-width: 99vw;
            transform: scale(2.25);
            z-index: 1 !important;
          }

          .bottom-action{
            position: absolute;
            bottom: 2rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            }

            .bottom-action > p{
            opacity: 50%;
            font-size: 25px;
            font-weight: 200;
            margin: 0;
            color: white;
            margin-bottom: .5rem;
            }

          .content {
            display: flex;
            position: relative;
            flex-direction: column;
            flex:2/3;
            flexGrow: 1;
            gap: 20px;
            justify-content: center;
            scroll-snap-align: start;
            scroll-behavior: smooth;
            overflow: hidden !important;
          }


          @keyframes fadeInSlideFromLeft {
            0% {
              opacity: 0;
              filter: blur(10px);
            }
            100% {
              opacity: 1;
              filter: blur(00px);
            }
          }

          .fade-in-slide-left {
            animation: fadeInSlideFromLeft 1.5s ease-out forwards;
          }

          h1 {
          font-weight: 800;
            font-size: 4vw !important;
            color: white;
            line-height: 98%;
            margin: 0;
          }

          h1 .highlight {
            color: #c1dc3a;
          }

          h3 {
            margin: 0;
            font-size: 30px;
            font-weight: 200;
            color: white;
            opacity: 0.5;
          }

          .image-container {
            flex: 1;
            flexGrow: 1;
            right: 0;
            overflow: hidden;
            z-index: 1 !important;
          }

          .model-image {
            border: 1px solid white;
            height: 90%;
            position: absolute;
            right: 0%;
            top: 10% !important;
            z-index: 1 !important;
          }

          @media only screen and (min-width: 1920px) {
            canvas {
              bottom:  ${7}rem !important;
              right: 10rem !important;
              transform: scale(${desktop ? 3.25 : 2.5}) !important;
              }
              .content > h1{
                font-size: 4.5rem;
              }
              .content > h3{
                font-size:2rem;
              }
              .bottom-action > p{
                font-size: 2rem
              }
          }

        `}
      </style>
    </SectionLayout>
  );
});

export default Landing;
