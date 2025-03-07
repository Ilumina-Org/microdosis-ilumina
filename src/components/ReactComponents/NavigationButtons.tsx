import { Whatsapp } from "iconsax-react";
import React, { useEffect, useRef, useState } from "react";
import Button from "../ReactComponents/Button";
import { useMediaQuery } from "react-responsive";

const NavigationButtons = () => {
  const [active, setActive] = useState<string | null>();

  const handleClick = (e: any, target: string) => {
    let value = e.target.getAttribute("href");
    if (`${value}`.includes(target)) {
      setActive(`${target}`);
    } else {
      setActive(null);
    }
  };

  const small = useMediaQuery({ query: "(min-width: 1400px)" });

  if (!small) {
    // return <p>loading</p>;
    return null;
  }

  const aStyling = {
    textDecoration: "none",
    color: "white",
  };

  const handleSelect = (value: string) => {
    if (active === value) {
      return "-.5px -.5px 0 #ffffff, .5px -.5px 0 #ffffff, -.5px .5px 0 #ffffff, .5px .5px 0 #ffffff";
    } else {
      return undefined;
    }
  };

  return (
    <div
      className="navigation"
      style={{
        position: "fixed",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "transparent",
        color: "white",
        zIndex: "10",
        gap: "20px",

        right: "4rem",
        top: "5rem",

        fontSize: small ? "22px" : "30px",
        fontFamily: "Inter",
        fontWeight: "200",
        textAlign: "right",
      }}
    >
      <a
        href="#inicio"
        onClick={(e) => handleClick(e, "inicio")}
        style={{
          ...aStyling,
          textShadow: handleSelect("inicio"),
          opacity: active == "inicio" ? 1 : 0.5,
        }}
      >
        Inicio
      </a>
      <a
        href="#about"
        onClick={(e) => handleClick(e, "about")}
        style={{
          ...aStyling,
          textShadow: handleSelect("about"),
          opacity: active == "about" ? 1 : 0.5,
        }}
      >
        ¿Qué es?
      </a>
      <a
        href="#testimonios"
        onClick={(e) => handleClick(e, "testimonios")}
        style={{
          ...aStyling,
          textShadow: handleSelect("testimonios"),
          opacity: active == "testimonios" ? 1 : 0.5,
        }}
      >
        Testimonios
      </a>
      <a
        href="#products"
        onClick={(e) => handleClick(e, "products")}
        style={{
          ...aStyling,
          textShadow: handleSelect("products"),
          opacity: active == "products" ? 1 : 0.5,
        }}
      >
        Productos
      </a>
      <a
        href="#faqs"
        onClick={(e) => handleClick(e, "faqs")}
        style={{
          ...aStyling,
          textShadow: handleSelect("faqs"),
          opacity: active == "faqs" ? 1 : 0.5,
        }}
      >
        Preguntas <br /> frecuentes
      </a>
      <style>
        {`
          .navigation > a:hover {
            opacity: 1 !important;
            transition: .25s ease-in-out !important;
          }
          `}
      </style>
    </div>
  );
};

export default NavigationButtons;
