import React, { useEffect, useState, useRef } from "react";
import { useMediaQuery } from "react-responsive";

type NavLink = {
  href: string;
  label: string;
  target: string;
  transitionName?: string;
};

const NavigationButtons: React.FC = () => {
  const [active, setActive] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const isLargeScreen = useMediaQuery({ query: "(min-width: 1400px)" }) ?? true;
  const observersRef = useRef<IntersectionObserver[]>([]);

  const navLinks: NavLink[] = [
    { href: "#landing-section", label: "Inicio", target: "landing" },
    {
      href: "#content-section",
      label: "¿Qué es?",
      target: "about",
      transitionName: "about-nav-link",
    },
    {
      href: "#testimonials-section",
      label: "Testimonios",
      target: "testimonios",
      transitionName: "testimonios-nav-link",
    },
    {
      href: "#products-section",
      label: "Productos",
      target: "products",
      transitionName: "products-nav-link",
    },
    {
      href: "#faq-section",
      label: "Preguntas frecuentes",
      target: "faqs",
      transitionName: "faqs-nav-link",
    },
  ];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    setIsMounted(true);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    if (observersRef.current.length > 0) {
      observersRef.current.forEach((observer) => observer.disconnect());
      observersRef.current = [];
    }
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };
    navLinks.forEach((link) => {
      const sectionId = link.href.replace("#", "");
      const section = document.getElementById(sectionId);
      if (section) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActive(link.target);
            }
          });
        }, options);
        observer.observe(section);
        observersRef.current.push(observer);
      }
    });
    return () => {
      observersRef.current.forEach((observer) => observer.disconnect());
    };
  }, [navLinks, isMounted]);

  if (!isMounted) return null;

  // Mejorado el estilo base para todos los enlaces de navegación
  const aStyling = {
    textDecoration: "none",
    color: "white",
    textShadow: "0px 0px 4px rgba(0, 0, 0, 0.9)", // Sombra más fuerte para mejor visibilidad
  };

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    target: string,
  ) => {
    const href = e.currentTarget.getAttribute("href");
    if (href?.includes(target)) {
      setActive(target);
    } else {
      setActive(null);
    }
    // Cerrar el menú móvil cuando se hace clic en un enlace
    if (isMobile) {
      setIsMobileMenuOpen(false);
    }
  };

  // Mejorada la función para resaltar el enlace activo
  const handleSelect = (value: string) => {
    return active === value
      ? "0px 0px 6px rgba(0, 0, 0, 1)" // Sombra más fuerte para el enlace activo
      : undefined;
  };

  const MenuIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ filter: "drop-shadow(0px 0px 1px rgba(0, 0, 0, 0.8))" }}
    >
      <line x1="3" y1="12" x2="21" y2="12"></line>
      <line x1="3" y1="6" x2="21" y2="6"></line>
      <line x1="3" y1="18" x2="21" y2="18"></line>
    </svg>
  );

  const CloseIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ filter: "drop-shadow(0px 0px 1px rgba(0, 0, 0, 0.8))" }}
    >
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  );

  const renderNavLinks = () => (
    <>
      {navLinks.map((link) => (
        <a
          key={link.target}
          href={link.href}
          {...(link.transitionName
            ? { "data-transition-name": link.transitionName }
            : {})}
          onClick={(e) => handleClick(e, link.target)}
          style={{
            ...aStyling,
            textShadow: handleSelect(link.target) || aStyling.textShadow,
            opacity: active === link.target ? 1 : 0.8, // Aumentada la opacidad para mejor visibilidad
            fontWeight: active === link.target ? "400" : "300", // Peso de fuente más evidente para el activo
            ...(isMobile
              ? {
                  fontSize: "20px",
                  padding: "10px 0",
                  textAlign: "center",
                  width: "100%",
                }
              : {}),
          }}
        >
          {link.label}
        </a>
      ))}
    </>
  );

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  if (isMobile) {
    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 1000,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            zIndex: 1100,
            cursor: "pointer",
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0 0 5px rgba(0, 0, 0, 0.3)",
          }}
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </div>
        {isMobileMenuOpen && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(1, 55, 38, 0.95)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "20px",
              zIndex: 1000,
            }}
          >
            {renderNavLinks()}
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className="navigation"
      style={{
        position: "fixed",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "transparent",
        color: "white",
        zIndex: 12,
        gap: "20px",
        right: "3rem",
        top: "5rem",
        fontSize: isLargeScreen ? "1.9vw" : "1.8vw",
        fontFamily: "Inter",
        fontWeight: "300", // Cambiado a 300 para mejor legibilidad
        textAlign: "right",
      }}
    >
      {renderNavLinks()}
      <style>
        {`
          .navigation > a {
            text-rendering: optimizeLegibility;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
          .navigation > a:hover {
            opacity: 1 !important;
            transition: opacity .2s ease-in-out !important;
            text-shadow: 0px 0px 6px rgba(0, 0, 0, 1) !important;
          }
        `}
      </style>
    </div>
  );
};
export default NavigationButtons;
