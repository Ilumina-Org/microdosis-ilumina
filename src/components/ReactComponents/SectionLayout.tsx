import React from "react";

export const SectionLayout = ({ id, children }: any) => {
  const containerStyle = {
    // overflow: "hidden",
    display: "flex",
    height: "100vh",
    justifyContent: "center",
    border: "1px solid white",
    background: `
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
      #013726`,
  };

  return (
    <section id={id} style={{ ...containerStyle, flexDirection: "row" }}>
      {children}
    </section>
  );
};
