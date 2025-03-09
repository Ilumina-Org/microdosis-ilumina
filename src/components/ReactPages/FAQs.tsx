import React, { useEffect } from "react";
import Button from "../ReactComponents/Button";
import { SectionLayout } from "../ReactComponents/SectionLayout";
import staticModel from "../../assets/model_static.png";
import logo from "../../assets/logo.png?url";
import TestimonialCarousel from "../ReactComponents/TestimonialCarousel";
import useResponsiveness from "../../utils/useResponsiveness";
import { Facebook, Whatsapp } from "iconsax-react";
import { useMediaQuery } from "react-responsive";

interface LandingProps {
  id: string;
  ref: React.Ref<HTMLDivElement>;
}

const Testimonials = React.forwardRef<HTMLDivElement, LandingProps>(
  (props, ref) => {
    const { handleResponsiveness } = useResponsiveness();
    let padding = handleResponsiveness([26, 10, 25, 10]);
    const desktop = useMediaQuery({ query: "(min-width: 1920px)" });
    const small = useMediaQuery({ query: "(min-width: 1366px)" });

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
            fontSize: small ? "2rem" : "2.4rem",
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
            // lineHeight: "1.75rem",
            lineHeight: "1.75vw",
            fontSize: small ? "1.2rem" : "1.25rem",
          }}
        >
          {answer}
        </p>
      </div>
    );

    const socialButtonStyles = {
      margin: 0,
      display: "flex",
      FlexDirection: "row",
      alignItems: "center",
      gap: "5px",
      color: "white",
      textDecoration: "none",
      opacity: "0.5",
    };

    return (
      <SectionLayout
        id={props.id}
        ref={ref}
        horizontalPadding={desktop ? "26vw" : "20vw"}
        // style={{ position: "absolute" }}
        style={{ display: "flex", flexDirection: "column", height: "auto" }}
        // verticalPadding={"4rem"}
      >
        <div
          style={{
            flexDirection: "column",
            alignContent: "space-around",
            marginTop: "5rem",
          }}
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              // alignItems: "right",
              // justifyContent: "center",
              justifyContent: "space-evenly",
              gap: "50px",
              flexDirection: "column",
            }}
          >
            <h3
              style={{
                fontSize: small ? "3vw" : "2.5rem",
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
            display: "flex",
            flexDirection: "column",
            gap: ".5rem",
            marginTop: "5rem",
            marginBottom: "1.5rem",
          }}
        >
          <div
            style={{
              // position: "absolute",
              // bottom: "2rem",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              gap: "15px",
              width: "92vw",
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
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              // flexDirection: "column",
              alignItems: "center",
              width: "fit-content",
              // paddingRight: desktop ? "5rem" : "6rem",
              gap: "20px",
            }}
          >
            <a
              style={{ ...socialButtonStyles }}
              href="google.com"
              target="blank"
            >
              <Whatsapp size="30" color="white" variant="Bold" />
              @31488226
            </a>
            <a
              style={{ ...socialButtonStyles }}
              href="google.com"
              target="blank"
            >
              <Facebook size="30" color="white" variant="Bold" />
              @illumina
            </a>
          </div>
        </div>
      </SectionLayout>
    );
  }
);

export default Testimonials;
