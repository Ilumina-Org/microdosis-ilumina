import React, { useEffect, useState } from "react";
import Button from "../ReactComponents/Button";
import { SectionLayout } from "../ReactComponents/SectionLayout";
import logo from "../../assets/logo.png?url";
import useResponsiveness from "../../utils/useResponsiveness";
import { Facebook, Whatsapp } from "iconsax-react";

interface LandingProps {
  id: string;
  ref: React.Ref<HTMLDivElement>;
}

const FaqsPage = React.forwardRef<HTMLDivElement, LandingProps>(
  (props, ref) => {
    const { handleResponsiveness, isSmallMobile, isMobile, isTablet } =
      useResponsiveness();

    // Force re-render on window resize to ensure styles update properly
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };

      window.addEventListener("resize", handleResize);
      // Initial render ensures we catch the right size
      handleResize();

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);

    const padding = handleResponsiveness([26, 10, 8, 6, 4, 2]);

    // Mobile detection with fallback
    const isMobileView = isSmallMobile || isMobile || windowWidth < 768;

    // Improved responsive calculation for FAQ width with fallback
    const faqWidth = isMobileView
      ? "100%"
      : handleResponsiveness([
          "calc(50% - 15px)", // Desktop
          "calc(50% - 15px)", // Large tablet
          "calc(50% - 15px)", // Tablet
          "100%", // Mobile
          "100%", // Small mobile
          "100%", // Extra small
        ]);

    const FAQ = ({ title, answer }) => (
      <div
        style={{
          width: faqWidth,
          boxSizing: "border-box",
          marginBottom: "30px",
          padding: "0 5px",
        }}
      >
        <h4
          style={{
            textWrap: "wrap",
            fontSize:
              handleResponsiveness([2.2, 2, 1.8, 1.6, 1.4, 1.2]) + "rem",
            fontWeight: "500",
            color: "#c1dc3a",
            margin: "0 0 10px 0",
          }}
        >
          {title}
        </h4>
        <p
          style={{
            fontWeight: "200",
            color: "white",
            lineHeight: "1.6",
            fontSize:
              handleResponsiveness([1.2, 1.1, 1, 0.95, 0.9, 0.85]) + "rem",
            margin: 0,
          }}
        >
          {answer}
        </p>
      </div>
    );

    // Use mobile layout for very small screens
    const isNarrowScreen = windowWidth < 768 || isSmallMobile || isMobile;

    return (
      <SectionLayout id={props.id} ref={ref}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
            width: "100%",
            padding: `0 ${isNarrowScreen ? "2rem" : padding + "rem"}`,
            boxSizing: "border-box",
          }}
        >
          {/* Main content */}
          <div style={{ flex: "1 0 auto", marginBottom: "2rem" }}>
            <h3
              style={{
                fontSize:
                  handleResponsiveness([3.2, 3, 2.5, 2.2, 1.8, 1.6]) + "rem",
                fontWeight: 200,
                color: "white",
                marginTop: "2rem",
                marginBottom: "2rem",
                textAlign: isNarrowScreen ? "center" : "left",
              }}
            >
              Preguntas frecuentes
            </h3>

            {/* Improved FAQ container */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                width: "100%",
                gap: isNarrowScreen ? "10px" : "30px",
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

          {/* Improved footer layout */}
          <footer
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: isNarrowScreen ? "column" : "row",
              width: "100%",
              marginTop: "auto",
              marginBottom: "2rem",
              gap: "30px",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                maxWidth: isNarrowScreen ? "100%" : "60%",
                textAlign: isNarrowScreen ? "center" : "left",
              }}
            >
              <div style={{ display: "block" }}>
                <img
                  src={logo}
                  width={handleResponsiveness([180, 160, 140, 120, 100, 90])}
                  style={{ margin: "0" }}
                  alt="Logo"
                />
              </div>
              <h4
                style={{
                  margin: "10px 0 0 0",
                  color: "white",
                  fontWeight: "100",
                  fontSize: handleResponsiveness([18, 16, 15, 14, 13, 12]),
                  opacity: "0.5",
                  wordWrap: "break-word",
                }}
              >
                Ilumina
              </h4>
              <p
                style={{
                  margin: "5px 0 0 0",
                  color: "white",
                  fontWeight: "100",
                  fontSize: handleResponsiveness([14, 13, 12, 12, 11, 10]),
                  opacity: "0.5",
                  wordWrap: "break-word",
                }}
              >
                Lorem ipsum dolor sit amet consectetur. Mi viverra tristique
                tristique massa
              </p>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: isNarrowScreen ? "center" : "flex-end",
                gap: "20px",
                width: isNarrowScreen ? "100%" : "auto",
              }}
            >
              <Button
                styles={{ backgroundColor: "white" }}
                icon={
                  <Whatsapp
                    size={handleResponsiveness([35, 30, 28, 25, 22, 20])}
                    color="#013726"
                    variant="Bold"
                  />
                }
                padding={handleResponsiveness([10, 8, 8, 7, 6, 5])}
              />
              <Button
                styles={{ backgroundColor: "white" }}
                icon={
                  <Facebook
                    size={handleResponsiveness([35, 30, 28, 25, 22, 20])}
                    color="#013726"
                    variant="Bold"
                  />
                }
                padding={handleResponsiveness([10, 8, 8, 7, 6, 5])}
              />
            </div>
          </footer>
        </div>
      </SectionLayout>
    );
  },
);

export default FaqsPage;
