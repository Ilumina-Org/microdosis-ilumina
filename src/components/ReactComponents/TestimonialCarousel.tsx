import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import imageUrl from "../../assets/user1.png?url";

const TestimonialCarousel = () => {
  const [opacityIndex, setOpacityIndex] = useState(0);
  const handleChange = (index: number) => {
    setOpacityIndex(index);
  };
  const formatText = (text: string, slice: number) => {
    return `${text.slice(0, slice)}...`;
  };

  const TestTestimonials = [
    {
      name: "Sofia P.",
      review: "Tras sufrir de depresión por años, las microdosis de ayahuasca me han dado una nueva perspectiva de vida. Cada día me siento más conectada con mi alegría interior y con las personas a mi alrededor. Es como si hubiera encontrado la llave para desbloquear mi felicidad.",
    },
    {
      name: "Carlos M",
      review: "La claridad mental que he alcanzado desde que comencé con las microdosis es increíble. Puedo pensar con más profundidad y resolver problemas con una eficiencia que nunca antes había experimentado. Ha mejorado enormemente mi desempeño en el trabajo y mi satisfacción personal."
    },
    {
      name: "Elena Q",
      review: "Después de años luchando con trastornos de ansiedad, finalmente siento que tengo control sobre mi vida. Las microdosis me han ayudado a calmar mi mente y a enfrentar situaciones estresantes con una serenidad que nunca pensé posible."
    },
    {
      name: "Tomás R",
      review: "Como atleta, siempre estoy buscando mejorar mi rendimiento y recuperación. Las microdosis de ayahuasca han sido fundamentales para mejorar mi concentración durante las competencias y acelerar mi recuperación después de entrenamientos intensos. Es un cambio radical en mi rutina deportiva."
    }
  ];

  const Testimonial = ({ name, review, index }: any) => {
    return (
      <div
        className="override-width"
        style={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          marginRight: "2rem",
          marginLeft: "2rem",
          height: "12rem",
          borderRadius: "30px",
          backgroundColor: "white",
          padding: "2rem",
          paddingLeft: "1.5rem",
          opacity: opacityIndex === index ? 1 : 0.25,
          transform: `scale(${opacityIndex === index ? 1 : 0.9})`,
        }}
      >
        <img
          src={imageUrl}
          alt=""
          fetchPriority="high"
          width="150"
          height="150"
          style={{
            borderRadius: "15px",
            maxWidth: "150px",
          }}
        />
        <div
          style={{
            flexDirection: "column",
            marginLeft: "1rem",
            alignItems: "center",
          }}
        >
          <p
            style={{
              marginTop: 0,
              textAlign: "left",
              fontStyle: "italic",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {formatText(
              review,
              500
            )}
          </p>
          <p
            style={{
              textAlign: "right",
              fontWeight: 600,
              marginBottom: 0,
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
          fontSize: "50px",
          fontWeight: 200,
          color: "#c1dc3a",
        }}
      >
        Opiniones de nuestros clientes
      </p>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        interval={2500}
        centerSlidePercentage={50}
        showThumbs={false}
        showArrows={false}
        showIndicators={false}
        showStatus={false}
        centerMode={true}
        onChange={(e) => handleChange(e)}
      >
        {TestTestimonials.map((testimonial, index) => (
          <Testimonial
            name={testimonial.name}
            review={testimonial.review}
            index={index}
            key={index}
          />
        ))}
      </Carousel>
    </div>
  );
};

export default TestimonialCarousel;
