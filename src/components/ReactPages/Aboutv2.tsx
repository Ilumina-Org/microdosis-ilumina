import React from "react";
import { SectionLayout } from "../ReactComponents/SectionLayout";
import useResponsiveness from "../../utils/useResponsiveness";
import PlaceHolderImage from "../ReactComponents/PlaceHolder";

interface LandingProps {
  id: string;
  horizontalPadding?: string | number;
  ref: React.Ref<HTMLDivElement>;
}

const About = React.forwardRef<HTMLDivElement, LandingProps>((props, ref) => {
  const { handleResponsiveness } = useResponsiveness();
  const padding = handleResponsiveness([26, 10, 5, 5]);
  // Altura dinámica según el dispositivo
  const sectionHeight = handleResponsiveness(["140vh", "auto", "auto", "auto"]);

  return (
    <SectionLayout id={props.id} ref={ref}>
      <div className="about-container">
        {/* Primera Sección */}
        <div className="about-section">
          <div className="about-text">
            <h2 className="about-title">¿Qué es la Microdosis de Ayahuasca?</h2>
            <p className="about-paragraph">
              La Microdosis de Ayahuasca Ilumina es una fórmula sublingual
              diaria que integra la liana de ayahuasca y el arbusto chacruna,
              ingredientes venerados por comunidades amazónicas en rituales de
              sanación por siglos. Esta práctica moderniza las tradiciones
              ancestrales, facilitando un acceso continuo y suave a sus
              reconocidos beneficios curativos.
            </p>
          </div>
          <div className="about-image">
            <PlaceHolderImage />
          </div>
        </div>

        {/* Segunda Sección */}
        <div className="about-section">
          <div className="about-image mobile-order-2">
            <PlaceHolderImage />
          </div>
          <div className="about-text mobile-order-1">
            <h2 className="about-title">Beneficios Principales</h2>
            <ul className="about-list">
              <li className="about-list-item">
                <span className="about-check">✓</span>
                <div>
                  <strong>Regulación de Neurotransmisores:</strong> Restablece
                  el equilibrio de dopamina, serotonina y más, mejorando tu
                  bienestar emocional y mental.
                </div>
              </li>
              <li className="about-list-item">
                <span className="about-check">✓</span>
                <div>
                  <strong>Estados Expandidos de Conciencia:</strong> Profundiza
                  tu autoconocimiento y expande tu conciencia, abriendo nuevas
                  perspectivas de vida.
                </div>
              </li>
              <li className="about-list-item">
                <span className="about-check">✓</span>
                <div>
                  <strong>Neurogénesis Mejorada:</strong> Estimula la producción
                  neuronal, aumentando tu creatividad y agudeza mental.
                </div>
              </li>
              <li className="about-list-item">
                <span className="about-check">✓</span>
                <div>
                  <strong>Enriquecimiento de Relaciones Personales:</strong>{" "}
                  Fortalece tus conexiones sociales, mejorando la comunicación y
                  la empatía en tus relaciones.
                </div>
              </li>
              <li className="about-list-item">
                <span className="about-check">✓</span>
                <div>
                  <strong>Potenciación del Sistema Inmunológico:</strong>{" "}
                  Refuerza tus defensas naturales y mejora la funcionalidad de
                  sistemas vitales.
                </div>
              </li>
              <li className="about-list-item">
                <span className="about-check">✓</span>
                <div>
                  <strong>Optimización del Sueño:</strong> Promueve patrones de
                  sueño más saludables y reparadores, esencial para una vida
                  plena y activa.
                </div>
              </li>
              <li className="about-list-item">
                <span className="about-check">✓</span>
                <div>
                  <strong>Revitalización de la Piel y Tejidos:</strong> Nutre y
                  revitaliza tu piel, mejorando su textura y elasticidad.
                </div>
              </li>
              <li className="about-list-item">
                <span className="about-check">✓</span>
                <div>
                  <strong>Auto Hipnosis en Meditaciones:</strong> Potencia tus
                  sesiones de meditación, facilitando un estado de auto hipnosis
                  para una relajación profunda.
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .about-container {
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            gap: 60px;
            width: 100%;
            padding: 20px 0;
          }

          .about-section {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            gap: 40px;
          }

          .about-text {
            width: 50%;
          }

          .about-title {
            font-size: 2.7rem;
            margin-top: 0;
            color: #013424;
          }

          .about-paragraph {
            font-size: 1.25rem;
            line-height: 1.6;
            color: #1d1d1d;
          }

          .about-image {
            width: 25rem;
            height: auto;
            display: flex;
            justify-content: center;
          }

          .about-list {
            list-style-type: none;
            padding: 0;
            display: flex;
            flex-direction: column;
            gap: 20px;
          }

          .about-list-item {
            display: flex;
            align-items: flex-start;
            gap: 10px;
            font-size: 1.25rem;
            line-height: 1.6;
            color: #1d1d1d;
          }

          .about-check {
            color: #969628;
            font-size: 1.5rem;
            flex-shrink: 0;
          }

          @media (max-width: 1399px) {
            .about-title {
              font-size: 2.3rem;
            }

            .about-paragraph,
            .about-list-item {
              font-size: 1.15rem;
            }

            .about-image {
              width: 22rem;
            }
          }

          @media (max-width: 992px) {
            .about-title {
              font-size: 2rem;
            }

            .about-paragraph,
            .about-list-item {
              font-size: 1.1rem;
            }

            .about-image {
              width: 18rem;
            }
          }

          @media (max-width: 768px) {
            .about-container {
              gap: 40px;
            }

            .about-section {
              flex-direction: column;
              gap: 20px;
            }

            .about-text {
              width: 100%;
              order: 1;
            }

            .about-image {
              width: 100%;
              max-width: 20rem;
              order: 2;
            }

            .mobile-order-1 {
              order: 1;
            }

            .mobile-order-2 {
              order: 2;
            }

            .about-title {
              font-size: 1.8rem;
              text-align: center;
            }
          }

          @media (max-width: 480px) {
            .about-title {
              font-size: 1.5rem;
            }

            .about-paragraph,
            .about-list-item {
              font-size: 1rem;
            }

            .about-check {
              font-size: 1.2rem;
            }
          }
        `}
      </style>
    </SectionLayout>
  );
});

export default About;
