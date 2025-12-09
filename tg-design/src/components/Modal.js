import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Pagination, Keyboard } from "swiper/modules";
import { useLocalization } from "../context/LocalizationContext";
import { XMarkIcon } from "@heroicons/react/24/outline";
import SkeletonImage from "./SkeletonImage";

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

      {/* Contenedor Principal - Responsivo Total */}
      <div className="relative bg-white w-full max-w-6xl h-[75vh] md:h-[75vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row animate-fade-in-up my-auto">
        
        {/* COLUMNA SUPERIOR/IZQUIERDA: Galería */}
        {/* En móvil: 40% de altura. En desktop/tablet: 60% de ancho y 100% altura */}
        <div className="w-full md:w-[60%] h-[40%] md:h-full relative bg-gray-100 flex-shrink-0">
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
                  <SkeletonImage
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

        {/* COLUMNA INFERIOR/DERECHA: Información */}
        {/* En móvil: Ocupa el resto de altura. En desktop/tablet: 40% de ancho */}
        <div className="w-full md:w-[40%] flex-1 md:h-full bg-white flex flex-col relative z-10 overflow-hidden">
          
          {/* Contenido con Scroll Interno */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 custom-scrollbar">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 leading-tight">
              {translate(project.title)}
            </h2>
            
            <div className="w-10 h-1 bg-[#FF5A5F] mb-4"></div>

            <div className="text-gray-600 text-sm lg:text-base leading-relaxed space-y-3">
              <p>{translate(project.description)}</p>
            </div>
          </div>

          {/* Footer Fijo Compacto */}
          <div className="p-4 sm:p-5 border-t border-gray-100 bg-white flex-shrink-0">
            <button
              onClick={openWhatsApp}
              className="w-full py-3 bg-[#FF5A5F] hover:bg-[#ff4449] text-white text-base font-bold rounded-lg shadow-md transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              <span>{translate("whatsappButton")}</span>
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
