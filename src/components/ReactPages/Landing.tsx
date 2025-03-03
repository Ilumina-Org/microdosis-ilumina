import React, { useEffect, useRef } from 'react';
import Button from '../ReactComponents/Button';
import { SectionLayout } from '../ReactComponents/SectionLayout';
import { ShoppingCart, ArrowDown2 } from 'iconsax-react';
import { initializeAnimation } from '../../utils/appleAnimation';
//now that im using react find a library that can do this easily, 
// import animationScript from '../../../public/animation.js'; 

interface LandingProps {
  id: string;
  horizontalPadding: any
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
    <SectionLayout id={props.id} ref={ref} horizontalPadding={props.horizontalPadding}>
      <div style={{ height: 'auto', position: 'absolute', left: '4rem', top: '2rem' }}>
        <p style={{ color: 'white', fontSize: '50px' }}>ILUMINA</p>
      </div>
      <div className="content fade-in-slide-left">
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
      <div className='bottom-action'>
        <p>Conoce mas sobre la Ayahuasca</p>
        <ArrowDown2 size={30} color='white' style={{ opacity: '50%' }} />
      </div>

      <style>
        {`
          :root {
            --centering-padding: ${props.horizontalPadding}rem;
          }
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

          /* Media Queries */
          @media only screen and (min-width: 2560px) {

          }

          @media only screen and (min-width: 1920px) and (max-width: 2559px) {
              canvas {
              bottom: 3rem;
              right: 0rem;
            }
          }

          @media only screen and (max-width: 768px) and (min-width: 768px) {
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