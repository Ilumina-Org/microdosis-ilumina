import React from "react";
import { SectionLayout } from "../ReactComponents/SectionLayout";
import TestimonialCarousel from "../ReactComponents/TestimonialCarousel";
import useResponsiveness from "../../utils/useResponsiveness";

interface LandingProps {
  id: string;
  ref: React.Ref<HTMLDivElement>;
}

const Testimonials = React.forwardRef<HTMLDivElement, LandingProps>(
  (props, ref) => {
    const { handleResponsiveness, isMobile, isSmallMobile } =
      useResponsiveness();

    const containerPadding = handleResponsiveness([2, 2, 1.5, 1, 0.5, 0.25]);
    const maxWidth = handleResponsiveness([900, 900, 800, "90%", "92%", "90%"]);
    const videoHeight = handleResponsiveness([515, 464, 400, 320, 240, 200]);
    const videoMinHeight = handleResponsiveness([464, 400, 350, 280, 200, 180]);
    const titleFontSize = handleResponsiveness([
      "1.5rem",
      "1.4rem",
      "1.3rem",
      "1.2rem",
      "1.1rem",
      "1rem",
    ]);

    return (
      <SectionLayout
        id={props.id}
        ref={ref}
        horizontalPadding={handleResponsiveness([0, 0, 0, 0, 0, 0])}
        height="auto"
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: `${containerPadding}rem 0`,
            width: "100%",
            maxWidth: "100%",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "fit-content",
              width: "100%",
              maxWidth: maxWidth,
              borderRadius: isSmallMobile || isMobile ? "10px" : "20px",
              overflow: "hidden",
              boxShadow: "1px 0px 40px rgba(0, 0, 0, 0.48)",
              margin: "0 auto 1rem auto",
            }}
          >
            <iframe
              width="100%"
              height={videoHeight}
              src="https://www.youtube.com/embed/qRTVg8HHzUo?si=oT9nLeT7KbVrjKc6"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              style={{
                display: "block",
                border: "none",
                aspectRatio: "16/9",
                minHeight: `${videoMinHeight}px`,
                maxHeight: "100%",
              }}
            ></iframe>
          </div>

          <div
            style={{
              width: "100%",
              maxWidth: "100%",
              padding: handleResponsiveness([
                "0",
                "0",
                "0",
                "0",
                "0 0.5rem",
                "0 0.5rem",
              ]),
              marginBottom: "1rem",
            }}
          >
            <p
              style={{
                fontSize: titleFontSize,
                fontWeight: 600,
                color: "#c1dc3a",
                textAlign: "center",
                margin: handleResponsiveness([
                  "1rem 0",
                  "1rem 0",
                  "0.8rem 0",
                  "0.6rem 0",
                  "0.4rem 0",
                  "0.3rem 0",
                ]),
              }}
            >
              Opiniones de nuestros clientes
            </p>

            <div
              style={{
                width: "100%",
                maxWidth: "100%",
                overflow: "hidden",
              }}
            >
              <TestimonialCarousel />
            </div>
          </div>
        </div>
      </SectionLayout>
    );
  },
);

export default Testimonials;
