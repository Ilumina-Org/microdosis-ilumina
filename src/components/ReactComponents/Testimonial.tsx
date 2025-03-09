import { useMediaQuery } from "react-responsive";
import PlaceHolder from "./PlaceHolder";

interface TestimonialItem {
  name: string;
  review: string;
  image?: string;
  isInView?: boolean;
}

export const Testimonial = ({
  name,
  review,
  image,
  index,
  isInView,
}: TestimonialItem & { index: number }) => {
  // Very short text for mobile
  const formatText = (text: string, slice: number) => {
    return `${text.slice(0, slice)}...`;
  };

  const laptop = useMediaQuery({ query: "(min-width: 1400px)" });
  const smallerLaptop = useMediaQuery({ query: "(min-width: 1366px)" });
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });
  const small = useMediaQuery({ query: "(max-width: 1399px)" });
  const isTablet = useMediaQuery({
    query: "(min-width: 768px) and (max-width: 1023px)",
  });
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const textLength = isMobile ? 60 : isTablet ? 120 : 150;

  return (
    <div
      // className="override-width testimonial-card"
      // style={{
      //   justifyContent: "space-between",
      //   alignItems: "center",
      //   display: "flex",
      //   flexDirection: "row",
      //   // margin: "auto",
      //   height: isMobile ? "auto" : isTablet ? "180px" : "10rem",
      //   borderRadius: "30px",
      //   backgroundColor: "white",
      //   padding: isMobile ? "0.75rem" : isTablet ? "1rem" : "2rem",
      //   opacity: opacityIndex === index ? 1 : 0.25,
      //   // transform: `scale(${opacityIndex === index ? 1 : 0.9})`,
      //   // width: isMobile ? "85%" : "40rem",
      //   maxWidth: isMobile ? "280px" : "none",
      //   boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.08)",
      // }}
      style={{
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        marginRight: "2rem",
        marginLeft: "2rem",
        height: !laptop ? (smallerLaptop ? "10rem" : "10rem") : "10rem",
        borderRadius: "30px",
        backgroundColor: "white",
        padding: !laptop ? (smallerLaptop ? "10rem" : ".5rem") : "10rem", // here respo
        opacity: isInView ? 1 : 0.25,
        flexDirection: "row",
        // gap: "20px",

        // width: "50%",
        // opacity: opacityIndex === index ? 1 : 0.25,
        // transform: `scale(${opacityIndex === index ? 1 : 0.9})`,
      }}
    >
      <div
        style={{
          width: "100%",
          overflow: "hidden",
          borderRadius: "15px",
          maxWidth: "150px",

          // width: isMobile ? "60px" : isTablet ? "80px" : "150px",
          // height: isMobile ? "60px" : isTablet ? "80px" : "150px",
          // overflow: "hidden",
          // borderRadius: "15px",
          // flexShrink: 0,
          // marginRight: isMobile ? "0.75rem" : "1rem",
        }}
      >
        {image ? (
          <img
            src={image}
            alt={`Foto de ${name}`}
            style={{
              height: !laptop ? (smallerLaptop ? "10rem" : "8rem") : "10rem", // here respo
              width: !laptop ? (smallerLaptop ? "10rem" : "8rem") : "10rem", // here respo
              // width: "100%",
              // height: "100%",
              objectFit: "cover",
            }}
          />
        ) : (
          <PlaceHolder />
        )}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column" as "column",
          justifyContent: "center",
          marginRight: "10px",
          marginLeft: "10px",
          height: "100%",
          width: "100%",
          overflow: "hidden",
        }}
      >
        <p
          style={{
            margin: 0,
            textAlign: "left",
            fontStyle: "italic",
            overflow: "hidden",
            textOverflow: "ellipsis",
            fontSize: isMobile ? "102px" : isTablet ? "12px" : "16px",
            lineHeight: isMobile ? "1.2" : "1.4",
            color: "#666",
          }}
        >
          {formatText(review, textLength)}
        </p>
        <p
          style={{
            textAlign: "right",
            fontWeight: 600,
            margin: 0,
            marginTop: "0.5rem",
            fontSize: isMobile ? "11px" : isTablet ? "14px" : "16px",
            width: "100%",
            color: "#333",
          }}
        >
          {name}
        </p>
      </div>
    </div>
  );
};
