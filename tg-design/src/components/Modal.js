import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Pagination } from "swiper/modules";
import { useLocalization } from "../context/LocalizationContext";

const openWhatsApp = () => {
  const phoneNumber = "+593983548611"; // Reemplázalo con tu número real
  const url = `https://wa.me/${phoneNumber}`;
  window.open(url, "_blank");
};

const Modal = ({ isOpen, onClose, project }) => {
  const { translate } = useLocalization();

  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full md:flex relative">
        
        {/* Botón de cierre con estilo similar a las flechas */}
        <div
          onClick={onClose}
          className="absolute top-3 right-3 bg-[#A8957A] hover:bg-[#8C7A5F] text-white w-10 h-10 rounded-full flex items-center justify-center z-50 cursor-pointer"
        >
          {/* Ícono de "X" (Heroicon o el que prefieras) */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>

        {/* Sección de imágenes (Swiper) */}
        <div className="md:w-1/2 w-full">
          <Swiper
            modules={[Navigation, Pagination]}
            navigation={{
              nextEl: ".swiper-button-next-custom",
              prevEl: ".swiper-button-prev-custom",
            }}
            pagination={{ clickable: true }}
            loop={true}
            spaceBetween={10}
            slidesPerView={1}
            className="h-[50vh] rounded-t-lg md:rounded-l-lg md:rounded-tr-none relative"
          >
            {project.images.map((img, index) => (
              <SwiperSlide key={index}>
                <img
                  src={img}
                  alt={`Imagen ${index + 1}`}
                  className="w-full h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-tr-none"
                />
              </SwiperSlide>
            ))}

            {/* Flecha "prev" personalizada */}
            <div className="swiper-button-prev-custom absolute left-2 top-1/2 -translate-y-1/2 bg-[#A8957A] hover:bg-[#8C7A5F] text-white w-10 h-10 rounded-full flex items-center justify-center z-10 cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </div>

            {/* Flecha "next" personalizada */}
            <div className="swiper-button-next-custom absolute right-2 top-1/2 -translate-y-1/2 bg-[#A8957A] hover:bg-[#8C7A5F] text-white w-10 h-10 rounded-full flex items-center justify-center z-10 cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Swiper>
        </div>

        {/* Sección de texto con título y descripción */}
        {/* OJO al "pt-12" para dar espacio extra arriba */}
        <div className="md:w-1/2 w-full p-6 pt-12 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {translate(project.title)}
            </h2>
            <p className="text-gray-600 text-sm">
              {translate(project.description)}
            </p>
          </div>

          {/* Botón de acción - Abrir WhatsApp */}
          <button
            className="bg-[#A8957A] hover:bg-[#8C7A5F] text-white font-semibold py-3 px-6 rounded-lg text-lg mt-4 transition duration-300"
            onClick={openWhatsApp}
          >
            {translate("whatsappButton")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
