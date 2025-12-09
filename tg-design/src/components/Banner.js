import React from "react";
import { Link } from "react-scroll";

const Banner = () => {
  return (
    <section className="w-full bg-gradient-to-r from-[#A8957A]/30 to-transparent dark:from-[#556B2F]/30 dark:to-transparent py-12 px-4">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-6">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-gray-100">
          Jose Rodriguez
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-gray-700 dark:text-gray-300">
          Desarrollador web & artífice de experiencias digitales
        </p>
        <p className="max-w-2xl text-gray-600 dark:text-gray-400">
          ¿Te gustaría un sitio web tan profesional y atractivo como este?
          <br />
          ¡Hablemos y creo la presencia online que tu negocio merece!
        </p>
        <Link
          to="contact"
          smooth={true}
          duration={500}
          offset={-80}
          className="inline-block bg-[#A8957A] hover:bg-[#8C7A5F] text-white font-semibold py-3 px-6 rounded-md shadow-lg transition-colors duration-300"
        >
          Contáctame
        </Link>
      </div>
    </section>
  );
};

export default Banner;
