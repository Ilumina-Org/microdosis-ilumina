import React, { useEffect, useState } from "react";
import { SectionLayout } from "../ReactComponents/SectionLayout";
import TestimonialCarousel from "../ReactComponents/TestimonialCarousel";
import { useMediaQuery } from "react-responsive";
import useResponsiveness from "../../utils/useResponsiveness";

interface LandingProps {
  id: string;
  ref: React.Ref<HTMLDivElement>;
}

const Testimonials = React.forwardRef<HTMLDivElement, LandingProps>(
  (props, ref) => {
    const desktop = useMediaQuery({ query: "(min-width: 1080px)" });
    const small = useMediaQuery({ query: "(max-width: 1399px)" });
    const { mobile } = useResponsiveness();

    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
      setHasMounted(true);
    }, []);

    if (!hasMounted) {
      return null;
    }

    return (
      <SectionLayout
        id={props.id}
        ref={ref}
        horizontalPadding={0}
        verticalPadding={10}
        height={"auto"}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "center",
            padding: "2rem 0",
          }}
        >
          <div
            style={{
              height: "fit-content",
              borderRadius: "20px",
              overflow: "hidden",
              boxShadow: "1px 10px 40px rgba(0, 0, 0, 0.48)",
            }}
          >
            <iframe
              width={mobile ? "350px" : desktop ? "850px" : "700px"}
              height={mobile ? "200px" : desktop ? "450px" : "400px"}
              src="https://www.youtube.com/embed/oCbUxZC_eto?rel=0&modestbranding=1&showinfo=0"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
          <TestimonialCarousel />
        </div>
      </SectionLayout>
    );
  }
);

export default Testimonials;
