import React, { use } from 'react';
// import Products from './Products.astro';
import NavigationButtons from './ReactComponents/NavigationButtons';
// import Testimonials from './Testimonials.astro';
// import Chatbot from './Chatbot.astro';
import Landing from './ReactPages/Landing';
import About from './ReactPages/About';
import useIntersectionObserver from '../utils/useIntersectionObserver';


const ObserverLayout = () => {
  const sections = [
    { id: 'inicio', color: 'white' },
    { id: 'about', color: 'black' },
    { id: 'testimonios', color: 'white' },
    { id: 'products', color: 'black' },
  ];

  //1080p
  //const centeringWidth = 30
  //tablet sizing
  const centeringWidth = 45

  const { visibleSection, sectionRefs } = useIntersectionObserver(sections);

  const menuColor = sections.find((sec) => sec.id === visibleSection)?.color || 'white';

  return (
    <>
      <NavigationButtons color={menuColor} section={visibleSection} sectionRefs={sectionRefs} />
      <Landing centeringWidth={centeringWidth} id="inicio" ref={(el:never) => (sectionRefs.current[0] = el)} />
      <About centeringWidth={centeringWidth} id="about" ref={(el:never) => (sectionRefs.current[1] = el)} />
      {/* <About id="about" ref={(el:never) => (sectionRefs.current[1] = el)} />
      <Testimonials id="testimonios" ref={(el:never) => (sectionRefs.current[2] = el)} />
      <Products id="products" ref={(el:never) => (sectionRefs.current[3] = el)} /> */}
      {/* <Chatbot /> */}
    </>
  );
};

export default ObserverLayout;