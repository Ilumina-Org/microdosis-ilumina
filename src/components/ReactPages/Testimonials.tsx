import React, { useEffect } from "react";
import Button from "../ReactComponents/Button";
import { SectionLayout } from "../ReactComponents/SectionLayout";
import staticModel from "../../assets/model_static.png";
import image1 from "../../assets/asset1.png?url";
import image2 from "../../assets/asset2.png?url";
import TestimonialCarousel from "../ReactComponents/TestimonialCarousel";
import { useMediaQuery } from "react-responsive";

interface LandingProps {
  id: string;
  ref: React.Ref<HTMLDivElement>;
}

const Testimonials = React.forwardRef<HTMLDivElement, LandingProps>(
  (props, ref) => {
    const desktop = useMediaQuery({ query: "(min-width: 1080px)" });
    if (!desktop) {
      null;
    }

    return (
      <SectionLayout id={props.id} ref={ref} horizontalPadding={0}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "2rem 0",
          }}
        >
          <div
            style={{
              height: "fit-content",
              // maxWidth: desktop ? "950px" : "800px",
              borderRadius: "20px",
              overflow: "hidden",
              boxShadow: "1px 0px 40px rgba(0, 0, 0, 0.48)",
            }}
          >
            <iframe
              width={desktop ? "850px" : "700px"}
              height={desktop ? "450px" : "350px"}
              src="https://www.youtube.com/embed/qRTVg8HHzUo?si=oT9nLeT7KbVrjKc6"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
          <TestimonialCarousel />
        </div>
      </SectionLayout>
    );
  },
);

export default Testimonials;
