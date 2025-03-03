import React, { use } from 'react';
// import Products from './Products.astro';
import NavigationButtons from './ReactComponents/NavigationButtons';
// import Testimonials from './Testimonials.astro';
// import Chatbot from './Chatbot.astro';
import Landing from './ReactPages/Landing';
import About from './ReactPages/About';
import Testimonials from './ReactPages/Testimonials';
import Products from './ReactPages/Products';


const ObserverLayout = () => {

  //1080p
  //const centeringWidth = 30
  //tablet sizing
  const horizontalPadding = 15;

  return (
    <>
      <NavigationButtons color={'white'}  />
      <Landing horizontalPadding={horizontalPadding} id="inicio" />
      <About horizontalPadding={horizontalPadding} id="about" />
      <Testimonials horizontalPadding={horizontalPadding} id="testimonios"  />
      <Products horizontalPadding={horizontalPadding} id="products"  />
      {/* <Chatbot /> */}
    </>
  );
};

export default ObserverLayout;