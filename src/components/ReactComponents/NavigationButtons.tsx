import React, { useState, useEffect } from "react";

const NavigationButtons = () => {
  const [active, setActive] = useState<string | null>();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();

    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleClick = (e: any, target: string) => {
    let value = e.target.getAttribute("href");
    if (`${value}`.includes(target)) {
      setActive(`${target}`);
      setIsMobileMenuOpen(false);
    } else {
      setActive(null);
    }
  };

  const aStyling = {
    textDecoration: "none",
    color: "white",
    transition: "all 0.3s ease",
  };

  const handleSelect = (value: string) => {
    return active === value
      ? "-.5px -.5px 0 #ffffff, .5px -.5px 0 #ffffff, -.5px .5px 0 #ffffff, .5px .5px 0 #ffffff"
      : undefined;
  };

  const navLinks = [
    { href: "", label: "Inicio", target: "landing" },
    {
      href: "#about",
      label: "¿Qué es?",
      target: "about",
      transitionName: "about-nav-link",
    },
    {
      href: "#testimonials",
      label: "Testimonios",
      target: "testimonios",
      transitionName: "testimonios-nav-link",
    },
    {
      href: "#products",
      label: "Productos",
      target: "products",
      transitionName: "products-nav-link",
    },
    {
      href: "#frequently-asked-questions",
      label: "Preguntas frecuentes",
      target: "faqs",
      transitionName: "faqs-nav-link",
    },
  ];

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
            textShadow: handleSelect(link.target),
            opacity: active == link.target ? 1 : 0.5,
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
    >
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  );

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
          }}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
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
        gap: "20px",
        right: "3rem",
        top: "5rem",
        fontSize: "30px",
        fontFamily: "Inter",
        fontWeight: "200",
        textAlign: "right",
        zIndex: 1000,
      }}
    >
      {renderNavLinks()}
    </div>
  );
};

export default NavigationButtons;
