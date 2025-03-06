import React from "react";

interface SectionLayoutProps {
  id?: string;
  children: React.ReactNode;
  background?: string;
  minHeight?: string;
  className?: string;
  padding?: string;
}

export const SectionLayout = React.forwardRef<HTMLElement, SectionLayoutProps>(
  (
    {
      id,
      children,
      background,
      minHeight = "100vh",
      className = "",
      padding = "2rem",
    },
    ref,
  ) => {
    // Fondo por defecto con gradiente
    const defaultBackground = `
      radial-gradient(
        41.74% 98.84% at 61.04% 47.01%,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 0.2) 100%
      ),
      linear-gradient(
        68.99deg,
        #003325 10.95%,
        #013726 60.57%,
        #013520 103.7%
      ),
      #013726`;

    return (
      <section
        id={id}
        ref={ref}
        className={className}
        style={{
          minHeight: minHeight,
          width: "100%",
          background: background || defaultBackground,
          boxSizing: "border-box",
          padding: padding,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {children}
      </section>
    );
  },
);
