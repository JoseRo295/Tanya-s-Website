import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import '../Styles/style.css' // Asegúrate de que todos los estilos necesarios están importados

// Import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import image1 from "../Images/corrusel/1.png";
import image2 from "../Images/corrusel/2.png";
import image3 from "../Images/corrusel/3.png";
import image4 from "../Images/corrusel/4.png";
import image5 from "../Images/corrusel/Безимени-1.png";

const ImageCarousel = () => {
  const calculateHeight = () => {
    const windowHeight = window.innerHeight;
    // Ajustando a un 70% o 80% del viewport para reducir la altura adicional
    const desiredHeight = windowHeight > 768 ? windowHeight * 0.7 : windowHeight * 0.8;
    return desiredHeight;
  };
  return (
    <Swiper
      modules={[Autoplay, Pagination, Navigation]}
      spaceBetween={30}
      centeredSlides={true}
      slidesPerView={1}
      autoplay={{
        delay: 10000,
        disableOnInteraction: false
      }}
      pagination={{
        clickable: true
      }}
      navigation={true}
      loop={true}
      className="mySwiper"
    >
      {[image1, image2, image3, image4, image5].map((image, index) => (
        <SwiperSlide key={index}>
          <div
            style={{
              height: `${calculateHeight()}px`,
              backgroundSize: 'contain', // Cambio a 'contain' para ajustar la imagen completa dentro del contenedor
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundImage: `url(${image})`
            }}
          >
            {/* Contenido opcional aquí */}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ImageCarousel;
