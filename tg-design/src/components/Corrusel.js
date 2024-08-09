import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay'; // Asegúrate de que todos los estilos necesarios están importados

// Import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import image1 from "../Images/corrusel/1.png";
import image2 from "../Images/corrusel/2.png";
import image3 from "../Images/corrusel/3.png";
import image4 from "../Images/corrusel/4.png";

const ImageCarousel = () => {
  return (
    <Swiper
      modules={[Autoplay, Pagination, Navigation]} // Asegúrate de registrar los módulos que vas a usar
      spaceBetween={30}
      centeredSlides={true}
      slidesPerView={1}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false
      }}
      pagination={{
        clickable: true
      }}
      navigation={true}
      loop={true}
      className="mySwiper" // Puedes definir estilos adicionales en styles.css si es necesario
    >
      {[
        image1,
        image2,
        image3,
        image4
      ].map((image, index) => (
        <SwiperSlide key={index}>
          <div
            style={{
              height: "100vh",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
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
