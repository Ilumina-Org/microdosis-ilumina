import React from "react";
import type { ForwardedRef } from "react";
import "./ContentSection.css";

interface ContentSectionProps {
  id: string;
}

const ContentSection = React.forwardRef<HTMLElement, ContentSectionProps>(
  (props, ref: ForwardedRef<HTMLElement>) => {
    const benefits = [
      "Regulación de Neurotransmisores",
      "Estados Expandidos de Conciencia",
      "Neuroplasticidad",
      "Enriquecimiento de Relaciones Personales",
      "Potenciación del Sistema Inmunológico",
      "Optimización del Sueño",
      "Revitalización de la Piel y Tejidos",
      "Auto Hipnosis en Meditaciones",
    ];

    return (
      <section id={props.id} ref={ref} className="content-section">
        <div className="content-block image-block">
          <img
            src="/assets/gotero_0.png"
            alt="Microdosis"
            className="ratio-image"
          />
        </div>
        <div className="content-block text-block">
          <h2>¿Qué es la Microdosis de Ayahuasca?</h2>
          <p>
            La Microdosis de Ayahuasca Ilumina es una fórmula sublingual diaria
            que integra la liana de ayahuasca y el arbusto chacruna,
            ingredientes venerados por comunidades amazónicas en rituales de
            sanación por siglos.
          </p>
        </div>
        <div className="content-block combined-block">
          <img
            src="/assets/gotero_1.png"
            alt="Beneficios"
            className="ratio-image"
          />
          <div className="combined-content">
            <h2>Beneficios Principales</h2>
            <ul className="benefits-list">
              {benefits.map((benefit, index) => (
                <li key={index}>
                  <span className="check">✓</span>
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    );
  },
);

export default ContentSection;
