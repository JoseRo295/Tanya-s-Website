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

// import image1 from "../Images/corrusel/1.png";
// import image2 from "../Images/corrusel/2.png";
// import image3 from "../Images/corrusel/3.png";
// import image4 from "../Images/corrusel/4.png";
// import image5 from "../Images/corrusel/Безимени-1.png";

// import image1 from "../Images/corrusel2/1.png";
import image2 from "../Images/corrusel2/2.png";
import image3 from "../Images/corrusel2/3.png";
import image4 from "../Images/corrusel2/4.png";
import image5 from "../Images/corrusel2/5.png";
import image6 from "../Images/corrusel2/6.png";

import image1 from "../Images/corrusel/5.png";



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
        image4,
        image5,
        image6,
        
      ].map((image, index) => (
        <SwiperSlide key={index}>
  <div
    style={{
      height: "85vh", // Mantiene la altura del carrusel
      width: "100%", // Asegura que ocupe todo el ancho
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <img
      src={image}
      alt={`Slide ${index + 1}`}
      style={{
        width: "100%", // Se ajusta al contenedor
        height: "100%", // Ocupa el 100% del contenedor
        objectFit: "contain", // Evita que se recorte la imagen
        borderRadius: "10px", // Agrega bordes redondeados si es necesario
      }}
    />
  </div>
</SwiperSlide>

      ))}
    </Swiper>
  );
};

export default ImageCarousel;
