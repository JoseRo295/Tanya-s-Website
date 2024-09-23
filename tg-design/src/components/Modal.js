import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const Modal = ({ isOpen, onClose, project }) => {
  if (!isOpen || !project) return null;

  // Estilos en línea para el modal y el contenido del carrusel
  const modalStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)' // Fondo semi-transparente oscuro
  };

  const modalContentStyle = {
    position: 'relative',
    padding: '20px',
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Blanco muy transparente
    borderRadius: '8px',
    maxWidth: '960px',
    width: '90%',
    maxHeight: '80vh', // Altura máxima del modal
    overflow: 'hidden',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'  // Sombras suaves para mejorar la visibilidad del modal
  };

  const buttonCloseStyle = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    padding: '5px',
    fontSize: '24px',
    fontWeight: 'bold',
    cursor: 'pointer'
  };

  const swiperStyle = {
    height: '70vh' // Altura del carrusel
  };

  return (
    <div style={modalStyle}>
      <div style={modalContentStyle}>
        <button style={buttonCloseStyle} onClick={onClose}>×</button>
        <h2 className="text-xl font-bold text-center mb-4">{project.title}</h2>
        <Swiper
          spaceBetween={10}
          slidesPerView={1}
          navigation={true}
          pagination={{ clickable: true }}
          style={swiperStyle}
        >
          {project.images.map((img, index) => (
            <SwiperSlide key={index}>
              <img src={img} alt={`Imagen ${index + 1}`} className="w-full h-full object-contain" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Modal;
