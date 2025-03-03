import React, { use } from 'react';
// import Products from './Products.astro';
import NavigationButtons from './ReactComponents/NavigationButtons';
// import Testimonials from './Testimonials.astro';
import Landing from './ReactPages/Landing';
import About from './ReactPages/About';
import Testimonials from './ReactPages/Testimonials';
import Products from './ReactPages/Products';
import ChatMedico from './ReactComponents/Chatbot';


const ObserverLayout = () => {

  //1080p
  //const centeringWidth = 30
  //tablet sizing
  const horizontalPadding = 15;

  return (
    <>
      <NavigationButtons color={'white'} />
      <Landing horizontalPadding={horizontalPadding} id="inicio" />
      <About horizontalPadding={horizontalPadding} id="about" />
      <Testimonials horizontalPadding={horizontalPadding} id="testimonios" />
      <Products horizontalPadding={horizontalPadding} id="products" />
      <ChatMedico />
    </>
  );
};

export default ObserverLayout;
