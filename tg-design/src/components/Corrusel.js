import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import "../Styles/style.css"; // Asegúrate de que todos los estilos necesarios están importados
import { useLocalization } from '../context/LocalizationContext'; // Replace with the actual path to your localization module

// Import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

// Importa las imágenes del carrusel
import image1 from "../Images/corrusel/7.png";
import image2 from "../Images/corrusel/8.png";
import image3 from "../Images/corrusel/9.png";
import image4 from "../Images/corrusel/10.png";

const openWhatsApp = () => {
  const phoneNumber = '+593983548611'; // Reemplaza con tu número
  const url = `https://wa.me/${phoneNumber}`;
  window.open(url, '_blank');
};
const ImageCarousel = () => {
  const { translate } = useLocalization();
  return (
    <div className="relative w-full h-screen">
      {/* Swiper Carrusel */}
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={0}
        centeredSlides={true}
        slidesPerView={1}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        loop={true}
        className="absolute top-0 left-0 w-full h-full"
      >
        {[image1, image2, image3, image4].map((image, index) => (
          <SwiperSlide key={index}>
            <div
              className="w-full h-screen bg-cover bg-center"
              style={{ backgroundImage: `url(${image})` }}
            >
              {/* Superposición Oscura */}
              <div className="absolute inset-0 bg-black bg-opacity-40"></div>

              {/* Contenido Centrado */}
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-6">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
                {translate("designerSpaceTitle")}
                </h1>
                <button onClick={openWhatsApp} className="bg-[#A8957A] hover:bg-[#8C7A5F] text-white font-semibold py-3 px-6 rounded-lg text-lg transition duration-300">
                {translate("orderDesignProject")}
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageCarousel;
