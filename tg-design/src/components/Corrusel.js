import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";
import "../Styles/style.css";

import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import { useLocalization } from "../context/LocalizationContext";
import { useIsMobile } from "../hook/useIsMobile";

// Importa las imágenes del carrusel (para desktop)
import image1 from "../Images/corrusel/7.png";
import image2 from "../Images/corrusel/8.png";
import image3 from "../Images/corrusel/9.png";
import image4 from "../Images/corrusel/10.png";

// Importa la imagen específica para móvil
import imageMobile from "../Images/corrusel/8.png";

const openWhatsApp = () => {
  const phoneNumber = "+593983548611";
  const url = `https://wa.me/${phoneNumber}`;
  window.open(url, "_blank");
};

const ImageCarousel = () => {
  const { translate } = useLocalization();
  const isMobile = useIsMobile(640);

  // Contenido de texto reutilizable con diseño premium
  const HeroContent = () => (
    <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-6 z-20 pointer-events-none">
      <div className="pointer-events-auto animate-fade-in-up">
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 drop-shadow-2xl tracking-tight leading-tight">
          {translate("designerSpaceTitleLine1")}
          <br />
          <span className="font-light italic block mt-2 text-3xl sm:text-4xl lg:text-5xl">
            {translate("designerSpaceTitleLine2")}
          </span>
        </h1>
        <button
          onClick={openWhatsApp}
          className="mt-8 bg-white/10 backdrop-blur-md border border-white/40 hover:bg-white/20 text-white font-semibold py-3 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]"
        >
          {translate("orderDesignProject")}
        </button>
      </div>
    </div>
  );

  // Versión móvil
  if (isMobile) {
    return (
      <div className="relative w-full h-screen overflow-hidden bg-gray-900">
        <img
          src={imageMobile}
          alt="Luxury Interior Design"
          className="w-full h-full object-cover image-fade-in opacity-0 animate-[fadeIn_1.2s_ease-out_forwards]"
          style={{ objectPosition: "47% 30%" }}
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60 z-10"></div>
        <HeroContent />
      </div>
    );
  }

  // Versión escritorio
  return (
    <div className="relative w-full h-screen bg-gray-900">
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        effect="fade"
        speed={1000} // Transición suave de 1 segundo
        spaceBetween={0}
        centeredSlides={true}
        slidesPerView={1}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={true}
        loop={true}
        className="absolute top-0 left-0 w-full h-full"
      >
        {[image1, image2, image3, image4].map((image, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-screen">
              <img
                src={image}
                alt={`Interior Design Project ${index + 1}`}
                className="w-full h-full object-cover animate-[scaleIn_20s_linear_infinite]"
                loading={index === 0 ? "eager" : "lazy"}
                fetchPriority={index === 0 ? "high" : "auto"}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70 z-10"></div>
            </div>
          </SwiperSlide>
        ))}
        {/* Contenido fijo sobre el slider para evitar parpadeos */}
        <HeroContent />
      </Swiper>
      
      {/* Estilos inline para animación de zoom lento (Efecto Ken Burns) */}
      <style>{`
        @keyframes scaleIn {
          from { transform: scale(1); }
          to { transform: scale(1.1); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out 0.5s forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default ImageCarousel;
