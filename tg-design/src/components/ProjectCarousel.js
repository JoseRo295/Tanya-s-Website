import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

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
  const projects = [
    {
      image: image1,
      title: "Proyecto 1",
      description: "Descripción breve del proyecto 1.",
    },
    {
      image: image2,
      title: "Proyecto 2",
      description: "Descripción breve del proyecto 2.",
    },
    {
      image: image3,
      title: "Proyecto 3",
      description: "Descripción breve del proyecto 3.",
    },
    {
      image: image4,
      title: "Proyecto 4",
      description: "Descripción breve del proyecto 4.",
    },
    {
      image: image5,
      title: "Proyecto 5",
      description: "Descripción breve del proyecto 4.",
    },
    {
      image: image6,
      title: "Proyecto 6",
      description: "Descripción breve del proyecto 4.",
    },
  ];

  return (
    <div id="project-carousel" className="py-10">
      <div className="container mx-auto text-center mb-8">
        <h2 className="text-4xl font-bold text-gray-800">Nuestros Proyectos</h2>
        <p className="text-gray-600">Puede familiarizarse con nuestros últimos proyectos terminados para decidir sobre la cooperación.</p>
      </div>
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={30}
        centeredSlides={false}
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
          <SwiperSlide key={index}>
            <div className="relative h-[60vh] md:h-[50vh] lg:h-[70vh] flex items-center justify-center bg-white shadow-lg rounded-lg overflow-hidden group">
              <img
                src={project.image}
                alt={project.title}
                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
              />
              {/* Capa de superposición negra con menos opacidad */}
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
  );
};

export default ProjectCarousel;
