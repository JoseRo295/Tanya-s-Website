import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Pagination } from "swiper/modules";
import { useLocalization } from "../context/LocalizationContext"; // Importamos el contexto para traducciones

const openWhatsApp = () => {
  const phoneNumber = "+593987149330"; // Reemplázalo con tu número real
  const url = `https://wa.me/${phoneNumber}`;
  window.open(url, "_blank");
};

const Modal = ({ isOpen, onClose, project }) => {
  const { translate } = useLocalization(); // Para traducciones

  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full md:flex relative">
        {/* Botón de cierre */}
       {/* Botón de cierre */}
        <button
          className="absolute top-3 right-3 text-gray-700 text-3xl font-bold hover:text-gray-900 transition z-50 md:block md:right-3 md:top-3  md:bg-transparent rounded-full p-2"
          onClick={onClose}
        >
          &times;
        </button>


        {/* Sección de imágenes (Swiper) */}
        <div className="md:w-1/2 w-full">
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={10}
            slidesPerView={1}
            className="h-[50vh] rounded-t-lg md:rounded-l-lg md:rounded-tr-none"
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
          </Swiper>
        </div>

        {/* Sección de texto con título y descripción */}
        <div className="md:w-1/2 w-full p-6 flex flex-col justify-between">
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
