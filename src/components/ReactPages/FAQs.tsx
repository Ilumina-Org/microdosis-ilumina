import React, { useEffect } from "react";
import Button from "../ReactComponents/Button";
import { SectionLayout } from "../ReactComponents/SectionLayout";
import staticModel from "../../assets/model_static.png";
import logo from "../../assets/logo.png?url";
import TestimonialCarousel from "../ReactComponents/TestimonialCarousel";
import useResponsiveness from "../../utils/useResponsiveness";
import { Facebook, Whatsapp } from "iconsax-react";

interface LandingProps {
  id: string;
  ref: React.Ref<HTMLDivElement>;
}

const Testimonials = React.forwardRef<HTMLDivElement, LandingProps>(
  (props, ref) => {
    const { handleResponsiveness } = useResponsiveness();
    let padding = handleResponsiveness([26, 10, 25, 10]);

    const FAQ = ({ title, answer }) => (
      <div
        style={{
          maxWidth: "calc(50%  - 40px)",
          boxSizing: "border-box",
        }}
      >
        <h4
          style={{
            textWrap: "wrap",
            fontSize: "2.4rem",
            fontWeight: "500",
            color: "#c1dc3a",
            margin: 0,
          }}
        >
          {title}
        </h4>
        <p
          style={{
            fontWeight: "200",
            color: "white",
            lineHeight: "1.75rem",
            fontSize: "1.25rem",
          }}
        >
          {answer}
        </p>
      </div>
    );

    return (
      <SectionLayout id={props.id} ref={ref} horizontalPadding={0}>
        <div
          style={{
            flexDirection: "column",
            alignContent: "space-around",
            paddingRight: `${padding}rem`,
            paddingLeft: `${padding}rem`,
            zIndex: 1,
          }}
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              // alignItems: "right",
              justifyContent: "center",
              gap: "50px",
              flexDirection: "column",
            }}
          >
            <h3
              style={{
                fontSize: "3.5rem",
                fontWeight: 200,
                color: "white",
                opacity: 1,
              }}
            >
              Preguntas frecuentas
            </h3>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignContent: "flex-start",
                flexBasis: "50%",
                gap: "30px",
              }}
            >
              <FAQ
                title={"¿Qué es una microdosis de ayahuasca?"}
                answer={
                  "Es una pequeña cantidad de ayahuasca administrada en forma de gotas sublinguales, diseñada para ofrecer los beneficios terapéuticos de la planta sin los efectos psicoactivos intensos de una dosis completa."
                }
              />
              <FAQ
                title={"¿Hay efectos secundarios?"}
                answer={
                  "Las microdosis están diseñadas para minimizar los efectos secundarios, pero como con cualquier suplemento, algunas personas pueden experimentar sensibilidad o reacciones alérgicas. Es importante comenzar con una dosis baja y ajustar según la respuesta del cuerpo."
                }
              />
              <FAQ
                title={"¿Cuánto tiempo tarda en notarse los efectos?"}
                answer={
                  "Los efectos pueden variar según el individuo, pero generalmente se comienzan a notar mejoras en el estado de ánimo y la claridad mental después de algunas semanas de uso regular."
                }
              />
              <FAQ
                title={"¿Necesito una receta médica para adquirirlas?"}
                answer={
                  "No se requiere receta médica para adquirir microdosis de ayahuasca en muchas regiones, pero siempre es recomendable consultar la legislación local y buscar productos de proveedores confiables y regulados."
                }
              />
            </div>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            display: "flex",
            justifyContent: "space-between",
            gap: "15px",
            flexDirection: "row",
            width: "92vw",
            marginTop: "90vh",
            zIndex: 1,
          }}
        >
          <div>
            <img src={logo} width={200} style={{ margin: "0" }} />
            <h4
              style={{
                margin: "0",
                color: "white",
                fontWeight: "100",
                fontSize: "20px",
                opacity: "0.5",
              }}
            >
              Lorem@ ipsum dolor sit amet consectetur. Mi viverra tristique
              tristique mass
            </h4>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-end",
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
        </div>
      </SectionLayout>
    );
  }
);

export default Testimonials;
