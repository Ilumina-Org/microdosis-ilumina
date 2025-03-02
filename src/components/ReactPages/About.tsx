import React, { useEffect } from 'react';
import Button from '../ReactComponents/Button';
import { SectionLayout } from '../ReactComponents/SectionLayout';
import staticModel from '../../assets/model_static.png';

interface LandingProps {
    id: string;
    centeringWidth: string | number
    ref: React.Ref<HTMLDivElement>;
}

const About = React.forwardRef<HTMLDivElement, LandingProps>((props, ref) => {
  return (
    <SectionLayout id={props.id} ref={ref}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div style={{ width: '30%' }}>
          <h2>Che cos'è la Microdose di Ayahuasca?</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean non odio
            quis elit sagittis luctus eget ac metus. Fusce finibus nec risus vitae
            facilisis. Morbi sit amet tempor arcu. Nullam eget velit venenatis,
            tincidunt sapien ac, commodo odio. Aenean sapien mauris, lobortis at
            nisl quis, gravida accumsan dui. Vivamus rhoncus ornare urna, ut mollis
            metus facilisis ut. Cras lacinia eros metus, ac sollicitudin ligula
            maximus hendrerit. Phasellus suscipit nunc mi
          </p>
        </div>
        <img
          src={staticModel.src}
          alt=""
          fetchPriority="high"
          width="300"
          height="300"
          style={{ height: '80%', objectFit: 'cover' }}
        />
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          height: '50%',
          justifyContent: 'center',
          gap: '30px',
        }}
      >
        <img
          src={staticModel.src}
          alt=""
          fetchPriority="high"
          width="300"
          height="300"
          style={{ height: '80%', objectFit: 'cover' }}
        />
        <div style={{ width: '30%' }}>
          <h2>Che cos'è la Microdose di Ayahuasca?</h2>
          <ul>
            <li>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean non
              odio quis elit sagittis
            </li>
            <li>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean non
              odio quis elit sagittis
            </li>
            <li>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean non
              odio quis elit sagittis
            </li>
            <li>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean non
              odio quis elit sagittis
            </li>
          </ul>
        </div>
      </div>
    </SectionLayout>
  );
});

export default About;