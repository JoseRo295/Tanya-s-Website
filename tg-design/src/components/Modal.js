import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Pagination, Keyboard } from "swiper/modules";
import { useLocalization } from "../context/LocalizationContext";
import { XMarkIcon } from "@heroicons/react/24/outline";

const openWhatsApp = () => {
  const phoneNumber = "+593983548611";
  const url = `https://wa.me/${phoneNumber}`;
  window.open(url, "_blank");
};

const Modal = ({ isOpen, onClose, project }) => {
  const { translate } = useLocalization();

  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Botón de Cerrar (Flotante - Único y Global) */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 z-[110] p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all duration-300 group"
      >
        <XMarkIcon className="w-8 h-8 group-hover:rotate-90 transition-transform duration-300" />
      </button>

      {/* Contenedor Principal - Altura Controlada y Más Compacta */}
      <div className="relative bg-white w-full max-w-5xl h-auto max-h-[85vh] sm:h-[550px] rounded-2xl shadow-2xl overflow-hidden flex flex-col lg:flex-row animate-fade-in-up">
        
        {/* COLUMNA IZQUIERDA: Galería (55% del ancho en desktop) */}
        <div className="w-full lg:w-[55%] h-[40%] lg:h-full relative bg-gray-100">
          <Swiper
            modules={[Navigation, Pagination, Keyboard]}
            navigation={{
              nextEl: ".swiper-button-next-custom",
              prevEl: ".swiper-button-prev-custom",
            }}
            pagination={{ 
              clickable: true,
              dynamicBullets: true,
            }}
            keyboard={{ enabled: true }}
            loop={true}
            className="h-full w-full"
          >
            {project.images.map((img, index) => (
              <SwiperSlide key={index}>
                <div className="w-full h-full relative">
                  <img
                    src={img}
                    alt={`Project view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}

            {/* Flechas de Navegación (Ocultas en muy móvil para limpiar vista) */}
            <div className="swiper-button-prev-custom absolute left-4 top-1/2 -translate-y-1/2 z-20 cursor-pointer p-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full hover:bg-white/40 transition-all text-white hidden sm:flex">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </div>
            <div className="swiper-button-next-custom absolute right-4 top-1/2 -translate-y-1/2 z-20 cursor-pointer p-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full hover:bg-white/40 transition-all text-white hidden sm:flex">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </div>
          </Swiper>
        </div>

        {/* COLUMNA DERECHA: Información (45% del ancho) */}
        <div className="w-full lg:w-[45%] h-[55%] lg:h-full bg-white flex flex-col relative z-10">
          
          {/* Contenido con Scroll Interno */}
          <div className="flex-1 overflow-y-auto p-6 lg:p-10 custom-scrollbar">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3 leading-tight">
              {translate(project.title)}
            </h2>
            
            <div className="w-10 h-1 bg-[#FF5A5F] mb-4"></div>

            <div className="text-gray-600 text-sm lg:text-base leading-relaxed space-y-3">
              <p>{translate(project.description)}</p>
            </div>
          </div>

          {/* Footer Fijo Compacto */}
          <div className="p-5 border-t border-gray-100 bg-white">
            <button
              onClick={openWhatsApp}
              className="w-full py-3 bg-[#FF5A5F] hover:bg-[#ff4449] text-white text-base font-bold rounded-lg shadow-md transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              <span>{translate("whatsappButton")}</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.097-.168.276-.073.415.772 1.022 1.766 1.987 2.908 2.87.127.102.306.085.41-.038l1.026-1.537a1.875 1.875 0 012.033-.67l4.473 1.118c.867.215 1.477.986 1.477 1.87v1.382a3 3 0 01-3 3H19.5a3 3 0 01-3-3 17.25 17.25 0 013-3 17.25 17.25 0 013-3H6.75a3 3 0 01-3 3V4.5z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #e5e7eb; border-radius: 10px; }
        .animate-fade-in-up { animation: fadeInUp 0.3s ease-out forwards; }
        @keyframes fadeInUp {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default Modal;
