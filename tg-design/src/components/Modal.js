  import React from "react";
  import { Swiper, SwiperSlide } from "swiper/react";
  import "swiper/css";
  import "swiper/css/pagination";
  import "swiper/css/navigation";

  const Modal = ({ isOpen, onClose, project }) => {
    if (!isOpen || !project) return null;

    // Estilos en línea para el modal y el contenido del carrusel
    const modalStyle = {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 50,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(255, 255, 255, 0.3)", // Fondo semi-transparente oscuro
      backdropFilter: "blur(8px)", // Desenfoque de fondo
    };

    const modalContentStyle = {
      position: "relative",
      padding: "30px",
      backgroundColor: "white", 
      borderRadius: "12px",
      maxWidth: "800px",
      width: "90%",
      maxHeight: "85vh",
      overflowY: "auto",
      
      backdropFilter: "blur(8px)", 
    };

    const buttonCloseStyle = {
      position: "absolute",
      top: "15px",
      right: "20px",
      padding: "10px",
      fontSize: "28px",
      fontWeight: "bold",
      color: "#000",
      cursor: "pointer",
      background: "transparent",
      border: "none",
      transition: "color 0.3s ease-in-out", 
    };

    const swiperStyle = {
      height: "65vh",
    };

    return (
      <div style={modalStyle} onClick={onClose}>
        <div style={modalContentStyle}  onClick={(e) => e.stopPropagation()}>
          <button
            style={buttonCloseStyle}
            onClick={onClose}
            onMouseEnter={(e) => (e.target.style.color = "gray")}  // Negro más claro en hover
            onMouseLeave={(e) => (e.target.style.color = "#000")} 
          >
            ×
          </button>

          <h2 className="text-xl font-bold text-center mb-4  ">{project.title}</h2>
          <Swiper
            spaceBetween={10}
            slidesPerView={1}
            navigation={true}
            pagination={{ clickable: true }}
            style={swiperStyle}
          >
            {project.images.map((img, index) => (
              <SwiperSlide key={index}>
                <img
                  src={img}
                  alt={`Imagen ${index + 1}`}
                  className="w-full h-full object-contain"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    );
  };

  export default Modal;
