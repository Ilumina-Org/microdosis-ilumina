import React, { useState } from 'react'
import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import imageUrl from '../../assets/user1.png?url'

const TestimonialCarousel = () => {

  const [opacityIndex, setOpacityIndex] = useState(0)
  const handleChange = (index: number) => {
    setOpacityIndex(index)
  }
  const formatText = (text:string, slice:number) => {
    return `${text.slice(0, slice)}...`
  }

    const TestTestimonials = [
            {
              "name": "John Doe",
              "review": "I had an amazing experience with this service! The team was professional, responsive, and delivered beyond my expectations. Highly recommend!"
            },
            {
              "name": "Jane Smith",
              "review": "Absolutely fantastic! The quality of work is top-notch, and the customer service is exceptional. I will definitely use them again."
            },
            {
              "name": "Jane Smith",
              "review": "Absolutely fantastic! The quality of work is top-notch, and the customer service is exceptional. I will definitely use them again."
            }
    ]
  
    const Testimonial = ({name, review, index}:any) => {
        return(
            <div
            className='override-width'
            style={{
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',  
                marginRight: '2rem',
                marginLeft: '2rem',
                height: '12rem',
                borderRadius: '30px',
                backgroundColor: 'white',
                padding: '2rem',
                paddingLeft: '1.5rem',
                opacity: opacityIndex === index ? 1 : 0.25,
            }}
          >
            <img
              src={imageUrl}
              alt=""
              fetchPriority="high"
              width="150"
              height="150"
              style={{ 
                borderRadius: "15px",
                maxWidth: "150px",
               }}
            />
            <div style={{ 
              flexDirection: "column", 
              marginLeft: "1rem" ,
              alignItems: "center",
              }}>
              <p style={{ 
                marginTop: 0, 
                textAlign: "left", 
                fontStyle: "italic",
                overflow: "hidden",
                textOverflow: "ellipsis",
                }}>
                  {formatText('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean nonodio quis elit sagittis luctus eget ac metus. Fusce finibus necrisus vitae facilisis. Morbi sit amet tempor arcu. Nullam eget velitvenenatis, tincidunt sapien ac', 200)}
              </p>
              <p style={{ 
                textAlign: "right", 
                fontWeight: 600,
                marginBottom: 0 
                }}>
                Carla Maurice R.
              </p>
            </div>
          </div>
        )
    }

    return (
        <div style={{ 
          width: '100%', 
          display: 'flex', 
          flexDirection: 'column',
          justifyContent: 'center', 
          alignItems: 'center', 
          }}>

            <p style={{
              fontSize: '45px',
              fontWeight: 200,
              color:'#c1dc3a',
              }}>
                Opiniones de nuestros clientes
            </p>
            <Carousel
            autoPlay={true}
            infiniteLoop={true}
            interval={2000}
            centerSlidePercentage={50}
            showThumbs={false}
            showArrows={false}
            showIndicators={false}
            showStatus={false}
            centerMode={true}
            onChange={(e) => handleChange(e)}
            >
            {TestTestimonials.map((testimonial,  index) => (
                <Testimonial 
                  name={testimonial.name} 
                  review={testimonial.review} 
                  index={index}
                  key={index}
                />
            ))}
            </Carousel>
        </div>
    )
}

export default TestimonialCarousel