import React, { useEffect } from 'react';
import Button from '../ReactComponents/Button';
import { SectionLayout } from '../ReactComponents/SectionLayout';
import staticModel from '../../assets/model_static.png';
import image1 from '../../assets/asset1.png?url';
import image2 from '../../assets/asset2.png?url';

interface LandingProps {
  id: string;
  horizontalPadding: string | number
  ref: React.Ref<HTMLDivElement>;
}

const About = React.forwardRef<HTMLDivElement, LandingProps>((props, ref) => {
  return (
    <SectionLayout id={props.id} ref={ref} background='white' horizontalPadding={props.horizontalPadding}>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>

        <div style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          height: 'fit-content',
          gap: '20px',
        }}>
          <div style={{
            width: '60%'
          }}>
            <h2 style={{ fontSize: '2.5rem', marginTop: 0, color: '#013022' }}>Che cos'è la Microdose di Ayahuasca?</h2>
            <p style={{ fontSize: '1.25rem', color: "#000" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean non odio
              quis elit sagittis luctus eget ac metus. Fusce finibus nec risus vitae
              facilisis. Morbi sit amet tempor arcu. Nullam eget velit venenatis,
              tincidunt sapien ac, commodo odio. Aenean sapien mauris, lobortis at
              nisl quis, gravida accumsan dui. Vivamus rhoncus ornare urna, ut mollis
              metus facilisis ut. Cras lacinia eros metus, ac sollicitudin ligula
              maximus hendrerit. Phasellus suscipit
            </p>
          </div>
          <img src={image1} alt='' width={'40%'} height={'auto'} />
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          height: 'fit-content',
          gap: '20px',
        }}>
          <img src={image2} alt='' width={'35%'} height={'auto'} />
          <div style={{ width: '60%' }}>
            <h2 style={{ fontSize: '2.5rem', marginTop: 0, color: '#013022' }}>Che cos'è la Microdose di Ayahuasca?</h2>
            <ul style={{ listStyleType: 'none', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <li style={{ fontSize: '1.25rem', color: "#000" }}>
                <span style={{ color: 'yellow', fontSize: '1.5rem', marginRight: '1rem' }}>✓</span>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean non odio.
              </li>
              <li style={{ fontSize: '1.25rem', color: "#000" }}>
                <span style={{ color: 'yellow', fontSize: '1.5rem', marginRight: '1rem' }}>✓</span>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean non odio.
              </li>
              <li style={{ fontSize: '1.25rem', color: "#000" }}>
                <span style={{ color: 'yellow', fontSize: '1.5rem', marginRight: '1rem' }}>✓</span>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean non odio.
              </li>
              <li style={{ fontSize: '1.25rem', color: "#000" }}>
                <span style={{ color: 'yellow', fontSize: '1.5rem', marginRight: '1rem' }}>✓</span>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean non odio.
              </li>
            </ul>
          </div>
        </div>

      </div>

    </SectionLayout>
  );
});

export default About;