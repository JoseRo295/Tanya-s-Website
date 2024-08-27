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
import image1 from "../Images/corrusel/1.png";
import image2 from "../Images/corrusel/2.png";
import image3 from "../Images/corrusel/3.png";
import image4 from "../Images/corrusel/4.png";

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
  ];

  return (
    <div id="project-carousel" className="bg-gray-100 py-10">
      <div className="container mx-auto text-center mb-8">
        <h2 className="text-4xl font-bold text-gray-800">Nuestros Proyectos</h2>
        <p className="text-gray-600">Una selección de nuestros proyectos recientes</p>
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
            <div className="relative h-[60vh] md:h-[50vh] lg:h-[70vh] flex items-center justify-center bg-white shadow-lg rounded-lg overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center p-4">
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
