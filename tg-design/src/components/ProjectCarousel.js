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
import image1 from "../Images/projects/project1/основнойвид.png";

import image3 from "../Images/projects/project3/Кухня2.png";
import image4 from "../Images/projects/project4/Кухня1.png";
import image5 from "../Images/projects/project5/1.png";
import image6 from "../Images/projects/project6/11.png";



//poyecto1

// Otras imágenes del proyecto 1 (para el Modal)
import img1_6 from "../Images/projects/project1/ВаннаяРеализация.jpg";
import img1_2 from "../Images/projects/project1/Гостиная_сравнение.jpg";
import img1_3 from "../Images/projects/project1/коридор.png";
import img1_4 from "../Images/projects/project1/кухня.png";
import img1_5 from "../Images/projects/project1/СпальняРеализация.jpg";
import img1_1 from "../Images/projects/project1/основнойвид.png";

//proyecto2

// Otras imágenes del Proyecto 2 (para el Modal)
import img2_6 from "../Images/projects/project2/Ванная.png";
import img2_2 from "../Images/projects/project2/Кухня.png";
import img2_3 from "../Images/projects/project2/Прихожая.png";
import img2_4 from "../Images/projects/project2/Спальня1.png";
import img2_5 from "../Images/projects/project2/Спальня2.png";
import img2_1 from "../Images/projects/project2/Спальня3.png";


//proyecto3   
// Otras imágenes del Proyecto 3 (para el Modal)
import img3_4 from "../Images/projects/project3/Ванная1.jpg";
import img3_2 from "../Images/projects/project3/Ванная2.jpg";
import img3_3 from "../Images/projects/project3/Кухня1.jpg";
import img3_1 from "../Images/projects/project3/Кухня2.png";
import img3_5 from "../Images/projects/project3/Кухня3.png";
import img3_6 from "../Images/projects/project3/Спальня_детали.jpg";
import img3_7 from "../Images/projects/project3/Спальня1.jpg";
import img3_8 from "../Images/projects/project3/Спальня2.jpg";


//proyecto4
// Otras imágenes del Proyecto 4 (para el Modal)
import img4_8 from "../Images/projects/project4/Ванная.jpeg";
import img4_2 from "../Images/projects/project4/детская.png";
// import img4_3 from "../Images/projects/project4/Коридор1.png";
// import img4_4 from "../Images/projects/project4/Коридор2.jpeg";
import img4_5 from "../Images/projects/project4/Кухня2.jpeg";
import img4_6 from "../Images/projects/project4/Спальня1.png";
import img4_7 from "../Images/projects/project4/Спальня2.png";
import img4_1 from "../Images/projects/project4/Кухня1.png";

//proyecto5
import img5_1 from "../Images/projects/project5/1.png";
import img5_2 from "../Images/projects/project5/2.png";

//proyecto6
import img6_11 from "../Images/projects/project6/1.png";
import img6_2 from "../Images/projects/project6/2.png";
import img6_3 from "../Images/projects/project6/3.png";
import img6_4 from "../Images/projects/project6/4.png";
import img6_5 from "../Images/projects/project6/5.png";
import img6_6 from "../Images/projects/project6/6.png";
import img6_7 from "../Images/projects/project6/7.png";
import img6_8 from "../Images/projects/project6/8.png";
import img6_9 from "../Images/projects/project6/9.png";
import img6_10 from "../Images/projects/project6/10.png";
import img6_1 from "../Images/projects/project6/11.png";


// Proyecto 7
import img7_6 from "../Images/projects/project7/1.jpg";
import img7_2 from "../Images/projects/project7/2.png";
import img7_3 from "../Images/projects/project7/3.jpg";
import img7_4 from "../Images/projects/project7/4.jpg";
import img7_5 from "../Images/projects/project7/5.jpg";
import img7_1 from "../Images/projects/project7/6.png";
import img7_7 from "../Images/projects/project7/7.jpg";
import img7_8 from "../Images/projects/project7/8.jpg";
import img7_9 from "../Images/projects/project7/9.jpg";
import img7_10 from "../Images/projects/project7/10.jpg";
import img7_11 from "../Images/projects/project7/11.jpg";
import img7_12 from "../Images/projects/project7/12.jpg";
import img7_13 from "../Images/projects/project7/13.jpg";
import img7_14 from "../Images/projects/project7/14.png";
import img7_15 from "../Images/projects/project7/15.jpg";
import img7_16 from "../Images/projects/project7/16.png";
import img7_17 from "../Images/projects/project7/17.png";
import img7_18 from "../Images/projects/project7/18.jpg";
import img7_19 from "../Images/projects/project7/19.jpg";
import img7_20 from "../Images/projects/project7/20.jpg";
import img7_21 from "../Images/projects/project7/21.jpg";
import img7_22 from "../Images/projects/project7/22.png";
import img7_23 from "../Images/projects/project7/23.png";
import img7_24 from "../Images/projects/project7/24.png";


//Proyecto 8
import img8_1 from "../Images/projects/project8/1.png";
import img8_2 from "../Images/projects/project8/2.png";
import img8_3 from "../Images/projects/project8/3.png";
import img8_5 from "../Images/projects/project8/5.png";

//proyecto9
import img9_1 from "../Images/projects/project9/1.jpg";
import img9_2 from "../Images/projects/project9/2.jpg";
import img9_3 from "../Images/projects/project9/3.jpg";
import img9_4 from "../Images/projects/project9/4.jpg";
import img9_5 from "../Images/projects/project9/5.jpg";
import img9_6 from "../Images/projects/project9/6.jpg";
import img9_7 from "../Images/projects/project9/7.jpg";
import img9_8 from "../Images/projects/project9/8.jpg";
import img9_9 from "../Images/projects/project9/9.jpg";
import img9_main from "../Images/projects/project9/ПЕРВАЯ картинка.jpg"; // Imagen principal

//proyecto10
// Importa las imágenes del Proyecto 10
import img10_1 from "../Images/projects/project10/1.jpg";
import img10_2 from "../Images/projects/project10/2.jpg";
import img10_3 from "../Images/projects/project10/3.jpg";
import img10_4 from "../Images/projects/project10/4.jpg";
import img10_5 from "../Images/projects/project10/5.jpg";


const ProjectCarousel = () => {
  const { translate } = useLocalization(); // Usar el contexto para traducciones
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  

  const projects = [
    {
      image: image6,
      images: [img6_1, img6_2, img6_3, img6_4, img6_5, img6_6, img6_7, img6_8, img6_9, img6_10, img6_11], // Imágenes adicionales para el Modal
      title: translate("proyecto6"),
      description: translate("descripcionProyecto6"),
    },
    {
      image: img7_1, // Imagen principal del carrusel
      images: [
        img7_1, img7_2, img7_3, img7_4, img7_5, img7_6, img7_7, img7_8, img7_9, img7_10, 
        img7_11, img7_12, img7_13, img7_14, img7_15, img7_16, img7_17, img7_18, img7_19, img7_20, 
        img7_21, img7_22, img7_23, img7_24
      ], // Imágenes adicionales para el Modal
      title: translate("proyecto7"),
      description: translate("descripcionProyecto7"),
    },
    {
      image: img8_1, // Imagen principal del carrusel
      images: [
        img8_1, img8_2, img8_3,img8_5, 
      ], // Imágenes adicionales para el Modal
      title: translate("proyecto8"),
      description: translate("descripcionProyecto8"),
    },
    {
      image: img9_main, // Imagen principal del proyecto
      images: [img9_main,img9_1, img9_2, img9_3, img9_4, img9_5, img9_6, img9_7, img9_8, img9_9], // Imágenes adicionales
      title: translate("proyecto9"),
      description: translate("descripcionProyecto9"),
    },
    {
      image: img10_1, // Imagen principal del proyecto
      images: [img10_1, img10_2, img10_3, img10_4, img10_5], // Imágenes adicionales
      title: translate("proyecto10"),
      description: translate("descripcionProyecto10"),
    },
    {
      image: image1,
      images: [img1_1, img1_2, img1_3, img1_4, img1_5,img1_6], // Imágenes adicionales del proyecto 1
      title: translate("proyecto1"), // Traducción del título
      description: translate("descripcionProyecto1"), // Traducción de la descripción
    },
    {
      image: img2_4,
      images: [img2_1, img2_2, img2_3, img2_4, img2_5, img2_6], 
      title: translate("proyecto2"),
      description: translate("descripcionProyecto2"),
    },
    {
      image: image3,
      images: [img3_1, img3_2, img3_3, img3_4, img3_5, img3_6, img3_7, img3_8],
      title: translate("proyecto3"),
      description: translate("descripcionProyecto3"),
    },    
    {
      image: image4,
      images: [img4_1, img4_2, img4_5, img4_6, img4_7, img4_8],
      title: translate("proyecto4"),
      description: translate("descripcionProyecto4"),
    },
    {
      image: image5,
      images: [img5_1, img5_2],
      title: translate("proyecto5"),
      description: translate("descripcionProyecto5"),
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
          delay: 15000,
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
