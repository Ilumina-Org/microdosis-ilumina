import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import PlaceHolder from "./PlaceHolder";
import { useMediaQuery } from "react-responsive";

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

  const formatText = (text: string, slice: number) => {
    return `${text.slice(0, slice)}...`;
  };

  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });
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

  const Testimonial = ({
    name,
    review,
    image,
    index,
  }: TestimonialItem & { index: number }) => {
    // Very short text for mobile
    const textLength = isMobile ? 60 : isTablet ? 120 : 200;

    return (
      <div
        className="override-width testimonial-card"
        style={{
          justifyContent: "space-between",
          alignItems: "center",
          display: "flex",
          flexDirection: "row",
          margin: "0 auto",
          height: isMobile ? "auto" : isTablet ? "180px" : "10rem",
          borderRadius: "30px",
          backgroundColor: "white",
          padding: isMobile ? "0.75rem" : isTablet ? "1rem" : "2rem",
          opacity: opacityIndex === index ? 1 : 0.25,
          transform: `scale(${opacityIndex === index ? 1 : 0.9})`,
          width: isMobile ? "85%" : "auto",
          maxWidth: isMobile ? "280px" : "none",
          boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.08)",
        }}
      >
        <div
          style={{
            width: isMobile ? "60px" : isTablet ? "80px" : "150px",
            height: isMobile ? "60px" : isTablet ? "80px" : "150px",
            overflow: "hidden",
            borderRadius: "15px",
            flexShrink: 0,
            marginRight: isMobile ? "0.75rem" : "1rem",
          }}
        >
          {image ? (
            <img
              src={image}
              alt={`Foto de ${name}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          ) : (
            <PlaceHolder />
          )}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column" as "column",
            justifyContent: "space-between",
            height: "100%",
            width: "100%",
            overflow: "hidden",
          }}
        >
          <p
            style={{
              margin: 0,
              textAlign: "left",
              fontStyle: "italic",
              overflow: "hidden",
              textOverflow: "ellipsis",
              fontSize: isMobile ? "10px" : isTablet ? "12px" : "14px",
              lineHeight: isMobile ? "1.2" : "1.4",
              color: "#666",
            }}
          >
            {formatText(review, textLength)}
          </p>
          <p
            style={{
              textAlign: "right",
              fontWeight: 600,
              margin: 0,
              marginTop: "0.5rem",
              fontSize: isMobile ? "11px" : isTablet ? "14px" : "16px",
              width: "100%",
              color: "#333",
            }}
          >
            {name}
          </p>
        </div>
      </div>
    );
  };

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
          fontSize: isMobile ? "24px" : isTablet ? "34px" : "50px",
          fontWeight: 200,
          color: "#c1dc3a",
          textAlign: "center",
          margin: isMobile ? "0.5rem 0" : "1rem 0",
        }}
      >
        Opiniones de nuestros clientes
      </p>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        interval={2250}
        centerSlidePercentage={isMobile ? 90 : isTablet ? 70 : 50}
        showThumbs={false}
        showArrows={false}
        showIndicators={isMobile}
        showStatus={false}
        centerMode={true}
        onChange={(e) => handleChange(e)}
        emulateTouch={true}
        swipeScrollTolerance={5}
        style={{ display: "flex", justifyContent: "center" }}
      >
        {TestTestimonials.map((testimonial, index) => (
          <Testimonial
            name={testimonial.name}
            review={testimonial.review}
            image={testimonial.image}
            index={index}
            key={index}
          />
        ))}
      </Carousel>
    </div>
  );
};

export default TestimonialCarousel;
