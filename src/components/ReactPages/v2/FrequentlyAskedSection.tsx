import React from "react";
import type { ForwardedRef } from "react";
import logo from "../../../assets/logo.png?url";
import "./FrequentlyAskedSection.css";

interface FrequentlyAskedSectionProps {
  id: string;
  [key: string]: any;
}

interface FAQItemProps {
  title: string;
  answer: string;
}

const FrequentlyAskedSection = React.forwardRef<
  HTMLElement,
  FrequentlyAskedSectionProps
>((props, ref: ForwardedRef<HTMLElement>) => {
  return (
    <section id={props.id} ref={ref} className="faq-section">
      <div className="faq-container">
        {/* Sección de Preguntas */}
        <div className="faq-content">
          <h3 className="faq-main-title">Preguntas frecuentes</h3>
          <div className="faq-grid">
            <FAQItem
              title="¿Qué es una microdosis de ayahuasca?"
              answer="Es una pequeña cantidad de ayahuasca administrada en forma de gotas sublinguales, utilizadas con fines terapéuticos o espirituales. No provoca efectos psicodélicos intensos, sino que busca equilibrio emocional y bienestar sin alterar la conciencia."
            />
            <FAQItem
              title="¿Hay efectos secundarios?"
              answer="Las microdosis están diseñadas para minimizar los efectos secundarios, pero algunas personas pueden experimentar ligeras náuseas, cambios en el estado de ánimo o variaciones en el sueño. Es importante ajustar la dosis y seguir recomendaciones para evitar molestias."
            />
            <FAQItem
              title="¿Cuánto tiempo tarda en notarse los efectos?"
              answer="Los efectos pueden variar según el individuo, la dosis y la sensibilidad personal. Generalmente, los cambios sutiles en el estado de ánimo, claridad mental o energía pueden sentirse en unos días, mientras que beneficios acumulativos se perciben con el uso continuo."
            />
            <FAQItem
              title="¿Necesito una receta médica para adquirirlas?"
              answer="No se requiere receta médica para adquirir microdosis, aunque es recomendable informarse sobre su legalidad en cada país. Se sugiere consultar con un especialista si se tienen condiciones preexistentes o se está tomando medicación para evitar interacciones."
            />
          </div>
        </div>
        {/* Footer */}
        <div className="faq-footer">
          <div className="brand-info">
            <img src={logo} alt="Logo" className="footer-logo" />
            <p className="brand-text">
              Lorem@ ipsum dolor sit amet consectetur. Mi viverra tristique
              tristique mass
            </p>
          </div>
        </div>
      </div>
    </section>
  );
});

const FAQItem: React.FC<FAQItemProps> = ({ title, answer }) => (
  <div className="faq-item">
    <h4 className="faq-title">{title}</h4>
    <p className="faq-answer">{answer}</p>
  </div>
);

export default FrequentlyAskedSection;
