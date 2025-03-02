import React, { useEffect, useRef } from 'react';
import Button from '../ReactComponents/Button';
import { SectionLayout } from '../ReactComponents/SectionLayout';
import { ShoppingCart } from 'iconsax-react';
import { initializeAnimation } from '../../utils/appleAnimation';
//now that im using react find a library that can do this easily, 
// import animationScript from '../../../public/animation.js'; 

interface LandingProps {
  id: string;
  centeringWidth: string | number
  ref: React.Ref<HTMLDivElement>;
}

const Landing = React.forwardRef<HTMLDivElement, LandingProps>((props, ref) => {
  // Use useEffect to run the script after the component mounts
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      initializeAnimation(canvasRef.current);
    }
  }, []);

  return (
    <SectionLayout id="inicio" ref={ref}>
      <div style={{ height: 'auto', position: 'absolute', left: '4rem', top: '2rem' }}>
        <p style={{ color: 'white', fontSize: '50px' }}>ILUMINA</p>
      </div>
      <div className="content">
        <h1>
          Descubre el poder <br /> sanador de la <br />
          <span className="highlight">Ayahuasca <br /> en Microdosis.</span>
        </h1>
        <h3>100% ingredientes naturales</h3>
        <Button
          id="toggle-chat"
          label="Comprar ahora"
          fontSize={30}
          icon={<ShoppingCart size={35} color='black' />}
        />
      </div>
      <div className="image-container">
        <canvas id="model-image" ref={canvasRef}></canvas>
      </div>

      <style>
        {`
          :root {
            --centering-width: ${props.centeringWidth}%;
          }

          canvas {
            position: absolute;
            bottom: 3rem;
            right: 5rem;
            max-height: 90vh;
            max-width: 99vw;
            transform: scale(2.25);
            z-index: 1;
          }

          .content {
            display: flex;
            position: relative;
            flex-direction: column;
            width: var(--centering-width);
            gap: 30px;
            justify-content: center;
            scroll-snap-align: start;
            scroll-behavior: smooth;
            overflow: hidden !important;
          }

          h1 {
            font-size: 70px;
            color: white;
            line-height: 98%;
            margin: 0;
          }

          h1 .highlight {
            color: #c1dc3a;
          }

          h3 {
            margin: 0;
            font-size: 35px;
            font-weight: 300;
            color: white;
            opacity: 0.5;
          }

          .image-container {
            width: var(--centering-width);
            right: 0;
            overflow: hidden;
          }

          .model-image {
            border: 1px solid white;
            height: 90%;
            position: absolute;
            right: 0%;
            top: 10% !important;
          }

          /* Media Queries */
          @media only screen and (min-width: 2560px) {
            :root {
              --centering-width: 25%;
            }
          }

          @media only screen and (min-width: 1920px) and (max-width: 2559px) {
            :root {
              --centering-width: 35%;
            }
          }

          @media only screen and (max-width: 768px) and (min-width: 768px) {
            :root {
              --centering-width: 40%;
            }
          }

          @media only screen and (max-width: 767px) {
            /* Add mobile styles here */
          }
        `}
      </style>
    </SectionLayout>
  );
});

export default Landing;