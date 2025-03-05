import React from "react";

export const SectionLayoutv2 = ({
  id,
  children,
  background,
  height = "auto",
  ref,
  horizontalPadding = 0,
}: any) => {
  const gradientBackground = `
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

  const containerStyle = {
    display: "flex",
    minHeight: height,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
    background: background || gradientBackground,
    paddingLeft: `${horizontalPadding}rem`,
    paddingRight: `${horizontalPadding}rem`,
    width: "100%",
    boxSizing: "border-box" as const,
  };

  return (
    <section id={id} ref={ref} style={containerStyle}>
      {children}
    </section>
  );
};
