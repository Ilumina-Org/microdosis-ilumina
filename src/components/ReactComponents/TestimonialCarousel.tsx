import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useMediaQuery } from "react-responsive";
import { Testimonial } from "./Testimonial";

interface TestimonialItem {
  name: string;
  review: string;
  image?: string;
}

const TestimonialCarousel = () => {
  const [opacityIndex, setOpacityIndex] = useState(0);

  const handleChange = (index: number) => {
    setOpacityIndex(index);
  };

  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });
  const small = useMediaQuery({ query: "(max-width: 1399px)" });
  const isTablet = useMediaQuery({
    query: "(min-width: 768px) and (max-width: 1023px)",
  });
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  const TestTestimonials: TestimonialItem[] = [
    {
      name: "Sofia P.",
      review:
        "Tras sufrir de depresión por años, las microdosis de ayahuasca me han dado una nueva perspectiva de vida. Cada día me siento más conectada con mi alegría interior y con las personas a mi alrededor. Es como si hubiera encontrado la llave para desbloquear mi felicidad.",
      image: "/assets/user1.png", // Ruta de ejemplo
    },
    {
      name: "Carlos M",
      review:
        "La claridad mental que he alcanzado desde que comencé con las microdosis es increíble. Puedo pensar con más profundidad y resolver problemas con una eficiencia que nunca antes había experimentado. Ha mejorado enormemente mi desempeño en el trabajo y mi satisfacción personal.",
      image: "/assets/user1.png",
    },
    {
      name: "Elena Q",
      review:
        "Después de años luchando con trastornos de ansiedad, finalmente siento que tengo control sobre mi vida. Las microdosis me han ayudado a calmar mi mente y a enfrentar situaciones estresantes con una serenidad que nunca pensé posible.",
      image: "/assets/user1.png",
    },
    {
      name: "Tomás R",
      review:
        "Como atleta, siempre estoy buscando mejorar mi rendimiento y recuperación. Las microdosis de ayahuasca han sido fundamentales para mejorar mi concentración durante las competencias y acelerar mi recuperación después de entrenamientos intensos. Es un cambio radical en mi rutina deportiva.",
      image: "/assets/user1.png",
    },
  ];

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <p
        style={{
          // fontSize: isMobile ? "24px" : isTablet ? "34px" : "50px",
          fontSize: small ? "3vw" : "2.5rem",
          fontWeight: 200,
          color: "#c1dc3a",
          textAlign: "center",
          margin: isMobile ? "1rem" : "2rem",
        }}
      >
        Opiniones de nuestros clientes
      </p>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        interval={2250}
        // centerSlidePercentage={isMobile ? 90 : isTablet ? 70 : 50}
        centerSlidePercentage={isMobile ? 90 : isTablet ? 70 : 30}
        showThumbs={false}
        showArrows={false}
        showIndicators={isMobile}
        showStatus={false}
        centerMode={true}
        onChange={(e) => handleChange(e)}
        emulateTouch={true}
        swipeScrollTolerance={5}
        // style={{ display: "flex", justifyContent: "center" }}
      >
        {TestTestimonials.map((testimonial, index) => (
          <Testimonial
            name={testimonial.name}
            review={testimonial.review}
            image={testimonial.image}
            isInView={opacityIndex == index}
            index={index}
            key={index}
          />
        ))}
      </Carousel>
    </div>
  );
};

export default TestimonialCarousel;
