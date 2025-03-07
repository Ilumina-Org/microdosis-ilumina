import React from "react";
import Button from "../ReactComponents/Button";
import { SectionLayout } from "../ReactComponents/SectionLayout";
import staticModel from "../../assets/model_static.png";
import image1 from "../../assets/asset1.png?url";
import image2 from "../../assets/asset2.png?url";
import useResponsiveness from "../../utils/useResponsiveness";
import placeholder from "../../assets/place_holder_image.svg";
import placeholdersvg from "../../assets/placeholder.svg";
import PlaceHolderImage from "../ReactComponents/PlaceHolder";
import { useMediaQuery } from "react-responsive";

interface LandingProps {
  id: string;
  horizontalPadding: string | number;
  ref: React.Ref<HTMLDivElement>;
}

const About = React.forwardRef<HTMLDivElement, LandingProps>((props, ref) => {
  const desktop = useMediaQuery({ query: "(min-width: 1920px)" });
  const small = useMediaQuery({ query: "(min-width: 1366px)" });

  return (
    <SectionLayout
      id={props.id}
      ref={ref}
      background="white"
      // horizontalPadding={padding}
      horizontalPadding={desktop ? "20vw" : "10vw"}
      verticalPadding={"5rem"}
      height="auto"
    >
      <div className="about-container">
        {/* First Section */}
        <div className="about-section">
          <div className="about-text">
            <h2 className="about-title">¿Qué es la Microdosis de Ayahuasca?</h2>
            <p className="about-paragraph text">
              La Microdosis de Ayahuasca Ilumina es una fórmula sublingual
              diaria que integra la liana de ayahuasca y el arbusto chacruna,
              ingredientes venerados por comunidades amazónicas en rituales de
              sanación por siglos. Esta práctica moderniza las tradiciones
              ancestrales, facilitando un acceso continuo y suave a sus
              reconocidos beneficios curativos.
            </p>
          </div>
          {/* <img src={placeholder.src} alt="trabajando en la imagen" className="about-image" /> */}
          <div className="about-image placeholderMask">
            <PlaceHolderImage />
          </div>
        </div>

        {/* Second Section */}
        <div className="about-section">
          {/* <img src={image2} alt="" className="about-image" /> */}
          <div className="about-image">
            <PlaceHolderImage />
          </div>
          <div className="about-text">
            <h2 className="about-title">Beneficios Principales</h2>
            <ul className="about-list">
              <li className="about-paragraph text">
                <span className="about-check">✓</span>
                <strong>Regulación de Neurotransmisores:</strong> Restablece el
                equilibrio de dopamina, serotonina y más, mejorando tu bienestar
                emocional y mental.
              </li>
              <li className="about-paragraph text">
                <span className="about-check">✓</span>
                <strong>Estados Expandidos de Conciencia:</strong> Profundiza tu
                autoconocimiento y expande tu conciencia, abriendo nuevas
                perspectivas de vida.
              </li>
              <li className="about-paragraph text">
                <span className="about-check">✓</span>
                <strong>Neurogénesis Mejorada:</strong> Es timula la producción
                neuronal, aumentando tu creatividad y agudeza mental.
              </li>
              <li className="about-paragraph text">
                <span className="about-check">✓</span>
                <strong>Enriquecimiento de Relaciones Personales:</strong>{" "}
                Fortalece tus conexiones sociales, mejorando la comunicación y
                la empatía en tus relaciones.
              </li>
            </ul>
          </div>
        </div>

        <div className="about-section">
          <div className="about-text">
            <ul className="about-list">
              <li className="about-paragraph text">
                <span className="about-check">✓</span>
                <strong>Potenciación del Sistema Inmunológico:</strong> Refuerza
                tus defensas naturales y mejora la funcionalidad de sistemas
                vitales.
              </li>
              <li className="about-paragraph text">
                <span className="about-check">✓</span>
                <strong>Optimización del Sueño:</strong> Promueve patrones de
                sueño más saludables y reparadores, esencial para una vida plena
                y activa.
              </li>
              <li className="about-paragraph text">
                <span className="about-check">✓</span>
                <strong>Revitalización de la Piel y Tejidos:</strong> Nutre y
                revitaliza tu piel, mejorando su textura y elasticidad.
              </li>
              <li className="about-paragraph text">
                <span className="about-check">✓</span>
                <strong>Auto Hipnosis en Meditaciones:</strong> Potencia tus
                sesiones de meditación, facilitando un estado de auto hipnosis
                para una relajación profunda.
              </li>
            </ul>
          </div>
          {/* <img src={placeholder.src} alt="trabajando en la imagen" className="about-image" /> */}
          <div className="about-image">
            <PlaceHolderImage />
          </div>
        </div>
      </div>
      <style>
        {`
            .about-container {
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              gap: 4rem;
            }

            .about-section {
              display: flex;
              flex-direction: row;
              justify-content: center;
              align-items: center;
              height: fit-content;
              gap: 4rem;
            }

            .about-text {
              width: 45%;
            }

            .about-title {
              font-size: 2.7rem;
              margin-top: 0;
              color: #013424;
            }

            .about-paragraph {
              font-size: 1.25rem;

              line-height: 1.5rem;
              color: #1d1d1d;
            }

            .about-image {
              width: 25rem;
              height: auto;
            }

            .about-list {
              list-style-type: none;
              display: flex;
              flex-direction: column;
              gap: 20px;

            }
            .about-check {
              color: #969628;
              font-size: 1.5rem;
              margin-right: 1rem;
            }
          `}
      </style>
    </SectionLayout>
  );
});

export default About;
