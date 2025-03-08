import React from "react";
import TestimonialCarousel from "../../ReactComponents/TestimonialCarousel";
import "./TestimonialSection.css";

interface TestimonialsProps {
  id?: string;
}

const TestimonialsSection = React.forwardRef<HTMLElement, TestimonialsProps>(
  (props, ref) => {
    return (
      <section id={props.id} ref={ref} className="testimonials-section">
        <div className="testimonials-container">
          <div className="video-wrapper">
            <iframe
              className="testimonial-video"
              src="https://www.youtube.com/embed/qRTVg8HHzUo?si=oT9nLeT7KbVrjKc6"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
          <TestimonialCarousel />
        </div>
      </section>
    );
  },
);

export default TestimonialsSection;
