import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Modal from './Modal'; // Asegúrate de importar el componente Modal
import { useLocalization } from '../context/LocalizationContext'; // Importar el contexto de localización

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

// Import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

// Importa las imágenes de tus proyectos
import image1 from "../Images/projects/project1/ГЛАВНАЯКАРТИНКА.png";
import image2 from "../Images/projects/project2/ЗАГЛАВНАЯКАРТИНКА.png";
import image3 from "../Images/projects/project3/ЗАГЛКАртинка.png";
import image4 from "../Images/projects/project4/главнаякартинка(2).png";
import image5 from "../Images/projects/project5/главнаякартинка(3).png";
import image6 from "../Images/projects/project6/заглкартинка(2).png";

const ProjectCarousel = () => {
  const { translate } = useLocalization(); // Usar el contexto para traducciones
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      image: image1,
      images: [image1, /* más imágenes del proyecto 1 aquí */],
      title: translate("proyecto1"), // Traducción del título
      description: translate("descripcionProyecto1"), // Traducción de la descripción
    },
    {
      image: image2,
      images: [image2, /* más imágenes del proyecto 2 aquí */],
      title: translate("proyecto2"),
      description: translate("descripcionProyecto2"),
    },
    {
      image: image3,
      images: [image3, /* más imágenes del proyecto 3 aquí */],
      title: translate("proyecto3"),
      description: translate("descripcionProyecto3"),
    },
    {
      image: image4,
      images: [image4, /* más imágenes del proyecto 4 aquí */],
      title: translate("proyecto4"),
      description: translate("descripcionProyecto4"),
    },
    {
      image: image5,
      images: [image5, /* más imágenes del proyecto 5 aquí */],
      title: translate("proyecto5"),
      description: translate("descripcionProyecto5"),
    },
    {
      image: image6,
      images: [image6, /* más imágenes del proyecto 6 aquí */],
      title: translate("proyecto6"),
      description: translate("descripcionProyecto6"),
    },
  ];

  const handleOpenModal = (project) => {
    setSelectedProject(project);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
       
      <div id="project-carousel" className="py-10">
      <div className="container mx-auto text-center mb-8">
        <h2 className="text-4xl font-bold text-gray-800">{translate("nuestrosProyectos")}</h2>
      </div>
      <Modal isOpen={modalOpen} onClose={handleCloseModal} project={selectedProject} />
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={30}
        slidesPerView={1}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false
        }}
        pagination={{
          clickable: true
        }}
        navigation={true}
        loop={true}
        className="projectSwiper"
      >
        {projects.map((project, index) => (
          <SwiperSlide key={index} onClick={() => handleOpenModal(project)}>
            <div className="relative h-[60vh] md:h-[50vh] lg:h-[70vh] flex items-center justify-center bg-white shadow-lg rounded-lg overflow-hidden group">
              <img
                src={project.image}
                alt={project.title}
                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-50 transition-all duration-500"></div>
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <h3 className="text-2xl font-semibold text-white">{project.title}</h3>
                <p className="text-white mt-2">{project.description}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
    </div>
  );
};

export default ProjectCarousel;
