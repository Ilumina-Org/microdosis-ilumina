import React from "react";
import Button from "../ReactComponents/Button";
import { SectionLayout } from "../ReactComponents/SectionLayout";
import staticModel from "../../assets/model_static.png";
import image1 from "../../assets/asset1.png?url";
import image2 from "../../assets/asset2.png?url";
import useResponsiveness from "../../utils/useResponsiveness";

interface LandingProps {
  id: string;
  horizontalPadding: string | number;
  ref: React.Ref<HTMLDivElement>;
}

const About = React.forwardRef<HTMLDivElement, LandingProps>((props, ref) => {
  const { handleResponsiveness } = useResponsiveness();
  let padding = handleResponsiveness([26, 10, 25, 10]);

  return (
    <SectionLayout
      id={props.id}
      ref={ref}
      background="white"
      horizontalPadding={padding}
    >
      <div className="about-container">
        {/* First Section */}
        <div className="about-section">
          <div className="about-text">
            <h2 className="about-title">
              Che cos'è la Microdose di Ayahuasca?
            </h2>
            <p className="about-paragraph">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
              non odio quis elit sagittis luctus eget ac metus. Fusce finibus
              nec risus vitae facilisis. Morbi sit amet tempor arcu. Nullam eget
              velit venenatis, tincidunt sapien ac, commodo odio. Aenean sapien
              mauris, lobortis at nisl quis, gravida accumsan dui. Vivamus
              rhoncus ornare urna, ut mollis metus facilisis ut. Cras lacinia
              eros metus, ac sollicitudin ligula maximus hendrerit. Phasellus
              suscipit
            </p>
          </div>
          <img src={image1} alt="" className="about-image" />
        </div>

        {/* Second Section */}
        <div className="about-section">
          <img src={image2} alt="" className="about-image" />
          <div className="about-text">
            <h2 className="about-title">
              Che cos'è la Microdose di Ayahuasca?
            </h2>
            <ul className="about-list">
              <li className="about-paragraph">
                <span className="about-check">✓</span>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                non odio.
              </li>
              <li className="about-paragraph">
                <span className="about-check">✓</span>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                non odio.
              </li>
              <li className="about-paragraph">
                <span className="about-check">✓</span>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                non odio.
              </li>
              <li className="about-paragraph">
                <span className="about-check">✓</span>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                non odio.
              </li>
            </ul>
          </div>
        </div>
      </div>
      <style>
        {`
            .about-container {
              display: flex;
              flex-direction: column;
              justify-content: space-around;
            }

            .about-section {
              display: flex;
              flex-direction: row;
              justify-content: space-around;
              align-items: center;
              height: fit-content;
              gap: 20px;
            }

            .about-text {
              width: 50%;
            }

            .about-title {
              font-size: 2.7rem;
              margin-top: 0;
              color: #013424;
            }

            .about-paragraph {
              font-size: 1.25rem;

              line-height: 1.5rem;
              color: #1d1d1d;
            }

            .about-image {
              width: 25rem;
              height: auto;
            }

            .about-list {
              list-style-type: none;
              display: flex;
              flex-direction: column;
              gap: 20px;

            }

            .about-check {
              color: #969628;
              font-size: 1.5rem;
              margin-right: 1rem;
            }
          `}
      </style>
    </SectionLayout>
  );
});

export default About;
