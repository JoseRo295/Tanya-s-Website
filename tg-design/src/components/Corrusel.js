import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import "../Styles/style.css";

import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useLocalization } from "../context/LocalizationContext";
import { useIsMobile } from "../hook/useIsMobile";

// Importa las imágenes del carrusel (para desktop)
import image1 from "../Images/corrusel/7.png";
import image2 from "../Images/corrusel/8.png";
import image3 from "../Images/corrusel/9.png";
import image4 from "../Images/corrusel/10.png";

// Importa la imagen específica para móvil
import imageMobile from  "../Images/corrusel/8.png"; // Ajusta la ruta y nombre

const openWhatsApp = () => {
  const phoneNumber = "+593983548611"; // Reemplaza con tu número
  const url = `https://wa.me/${phoneNumber}`;
  window.open(url, "_blank");
};

const ImageCarousel = () => {
  const { translate } = useLocalization();
  const isMobile = useIsMobile(640);

  // Versión móvil: UNA sola imagen
  if (isMobile) {
    return (
      <div className="relative w-full h-screen">
        {/* Imagen completa */}
        <img
          src={imageMobile}
          alt="Mobile Hero"
          className="w-full h-full object-cover" 
          style={{ objectPosition: '47% 30%' }} 
          // Usa "object-contain" si quieres ver la imagen completa sin recortar:
          // className="w-full h-full object-contain"
        />

        {/* Superposición Oscura */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>

        {/* Contenido Centrado */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
            {translate("designerSpaceTitle")}
          </h1>
          <button
            onClick={openWhatsApp}
            className="bg-[#A8957A] hover:bg-[#8C7A5F] text-white font-semibold py-3 px-6 rounded-lg text-lg transition duration-300"
          >
            {translate("orderDesignProject")}
          </button>
        </div>
      </div>
    );
  }

  // Versión escritorio: Carrusel con Swiper
  return (
    <div className="relative w-full h-screen">
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
              <div className="absolute inset-0 bg-black bg-opacity-40"></div>

              <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-6">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
                  {translate("designerSpaceTitle")}
                </h1>
                <button
                  onClick={openWhatsApp}
                  className="bg-[#A8957A] hover:bg-[#8C7A5F] text-white font-semibold py-3 px-6 rounded-lg text-lg transition duration-300"
                >
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
