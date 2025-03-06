import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import PlaceHolder from "./PlaceHolder";

const TestimonialCarousel = () => {
  const [opacityIndex, setOpacityIndex] = useState(0);
  const [deviceType, setDeviceType] = useState("desktop");

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 480) {
        setDeviceType("mobile");
      } else if (width <= 768) {
        setDeviceType("tablet-small");
      } else if (width <= 1024) {
        setDeviceType("tablet");
      } else {
        setDeviceType("desktop");
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initialize with current size

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleChange = (index: number) => {
    setOpacityIndex(index);
  };

  const formatText = (text: string) => {
    const maxLength =
      deviceType === "mobile"
        ? 100
        : deviceType === "tablet-small"
          ? 120
          : deviceType === "tablet"
            ? 150
            : 200;
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };

  const TestTestimonials = [
    {
      name: "Sofia P.",
      review:
        "Tras sufrir de depresión por años, las microdosis de ayahuasca me han dado una nueva perspectiva de vida. Cada día me siento más conectada con mi alegría interior y con las personas a mi alrededor. Es como si hubiera encontrado la llave para desbloquear mi felicidad.",
    },
    {
      name: "Carlos M",
      review:
        "La claridad mental que he alcanzado desde que comencé con las microdosis es increíble. Puedo pensar con más profundidad y resolver problemas con una eficiencia que nunca antes había experimentado. Ha mejorado enormemente mi desempeño en el trabajo y mi satisfacción personal.",
    },
    {
      name: "Elena Q",
      review:
        "Después de años luchando con trastornos de ansiedad, finalmente siento que tengo control sobre mi vida. Las microdosis me han ayudado a calmar mi mente y a enfrentar situaciones estresantes con una serenidad que nunca pensé posible.",
    },
    {
      name: "Tomás R",
      review:
        "Como atleta, siempre estoy buscando mejorar mi rendimiento y recuperación. Las microdosis de ayahuasca han sido fundamentales para mejorar mi concentración durante las competencias y acelerar mi recuperación después de entrenamientos intensos. Es un cambio radical en mi rutina deportiva.",
    },
  ];

  const getCardHeight = () => {
    switch (deviceType) {
      case "mobile":
        return "auto";
      case "tablet-small":
        return "auto";
      case "tablet":
        return "auto";
      default:
        return "auto";
    }
  };

  const getCardWidth = () => {
    switch (deviceType) {
      case "mobile":
        return "85%";
      case "tablet-small":
        return "85%";
      case "tablet":
        return "90%";
      default:
        return "90%";
    }
  };

  const Testimonial = ({
    name,
    review,
    index,
  }: {
    name: string;
    review: string;
    index: number;
  }) => {
    return (
      <div
        className="testimonial-card"
        style={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          margin: "0 auto",
          width: getCardWidth(),
          height: getCardHeight(),
          minHeight: deviceType === "mobile" ? "auto" : "12rem",
          borderRadius: deviceType === "mobile" ? "20px" : "30px",
          backgroundColor: "white",
          padding:
            deviceType === "mobile"
              ? "1rem"
              : deviceType === "tablet-small"
                ? "1.5rem"
                : "2rem 1.5rem",
          opacity: opacityIndex === index ? 1 : 0.25,
          transform: `scale(${opacityIndex === index ? 1 : 0.9})`,
          transition: "opacity 0.3s ease, transform 0.3s ease",
          flexDirection:
            deviceType === "mobile" || deviceType === "tablet-small"
              ? "column"
              : "row",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div
          style={{
            flex: "0 0 auto",
            marginBottom:
              deviceType === "mobile" || deviceType === "tablet-small"
                ? "1rem"
                : "0",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <PlaceHolder />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft:
              deviceType === "mobile" || deviceType === "tablet-small"
                ? "0"
                : "1rem",
            flex: "1 1 auto",
          }}
        >
          <p
            style={{
              marginTop: 0,
              textAlign: "left",
              fontStyle: "italic",
              overflow: "hidden",
              textOverflow: "ellipsis",
              fontSize:
                deviceType === "mobile"
                  ? "14px"
                  : deviceType === "tablet-small"
                    ? "15px"
                    : "16px",
              lineHeight: deviceType === "mobile" ? "1.4" : "1.5",
            }}
          >
            {formatText(review)}
          </p>
          <p
            style={{
              textAlign: "right",
              fontWeight: 600,
              marginBottom: 0,
              fontSize: deviceType === "mobile" ? "16px" : "18px",
            }}
          >
            {name}
          </p>
        </div>
      </div>
    );
  };

  const getCenterSlidePercentage = () => {
    switch (deviceType) {
      case "mobile":
        return 100;
      case "tablet-small":
        return 90;
      case "tablet":
        return 70;
      default:
        return 50;
    }
  };

  const getTitleFontSize = () => {
    switch (deviceType) {
      case "mobile":
        return "28px";
      case "tablet-small":
        return "32px";
      case "tablet":
        return "40px";
      default:
        return "50px";
    }
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <p
        style={{
          fontSize: getTitleFontSize(),
          fontWeight: 200,
          color: "#c1dc3a",
          textAlign: "center",
          margin: deviceType === "mobile" ? "0.5rem 0 1rem" : "1rem 0 2rem",
          padding: "0 1rem",
        }}
      >
        Opiniones de nuestros clientes
      </p>
      <div style={{ width: "100%", overflow: "hidden" }}>
        <Carousel
          autoPlay={true}
          infiniteLoop={true}
          interval={5000}
          centerSlidePercentage={getCenterSlidePercentage()}
          showThumbs={false}
          showArrows={deviceType !== "mobile"}
          showIndicators={true}
          showStatus={false}
          centerMode={true}
          swipeable={true}
          emulateTouch={true}
          onChange={(e) => handleChange(e)}
          preventMovementUntilSwipeScrollTolerance={true}
          swipeScrollTolerance={50}
          renderArrowPrev={(clickHandler, hasPrev) =>
            hasPrev &&
            deviceType !== "mobile" && (
              <button
                onClick={clickHandler}
                className="control-arrow control-prev"
                style={{
                  position: "absolute",
                  zIndex: 2,
                  top: "50%",
                  left: "10px",
                  transform: "translateY(-50%)",
                  background: "rgba(0,0,0,0.3)",
                  borderRadius: "50%",
                  width: deviceType === "tablet-small" ? "30px" : "40px",
                  height: deviceType === "tablet-small" ? "30px" : "40px",
                  cursor: "pointer",
                  border: "none",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <span style={{ color: "white", fontSize: "20px" }}>{"<"}</span>
              </button>
            )
          }
          renderArrowNext={(clickHandler, hasNext) =>
            hasNext &&
            deviceType !== "mobile" && (
              <button
                onClick={clickHandler}
                className="control-arrow control-next"
                style={{
                  position: "absolute",
                  zIndex: 2,
                  top: "50%",
                  right: "10px",
                  transform: "translateY(-50%)",
                  background: "rgba(0,0,0,0.3)",
                  borderRadius: "50%",
                  width: deviceType === "tablet-small" ? "30px" : "40px",
                  height: deviceType === "tablet-small" ? "30px" : "40px",
                  cursor: "pointer",
                  border: "none",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <span style={{ color: "white", fontSize: "20px" }}>{">"}</span>
              </button>
            )
          }
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
    </div>
  );
};

export default TestimonialCarousel;
