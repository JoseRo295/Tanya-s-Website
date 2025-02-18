import React from "react";
import image1 from "../Images/Tanya/6.jpg"; // Asegúrate de que esta ruta sea correcta
import { useLocalization } from "../context/LocalizationContext"; // Importar el contexto de localización

const AboutMe  = () => {
  const { translate } = useLocalization(); // Usar la función translate

  return (
    <div className="flex flex-col lg:flex-row items-center justify-between p-10 lg:p-16 bg-gray-50">
      {/* Sección de texto */}
      <div className="lg:w-1/2 w-full mb-8 lg:mb-0 lg:pr-8">
        {/* <h1 className="text-4xl font-bold text-gray-900 mb-6 lg:text-left text-center">
          {translate("projectTeam")}
        </h1> */}
        <p className="text-lg text-gray-700 leading-relaxed lg:text-left text-center">
          {translate("teamDescription")}
        </p>
      </div>

      {/* Sección de la imagen */}
      <div className="lg:w-1/2 w-full flex flex-col items-center">
        <img
          src={image1}
          alt="Project Team Member 1"
          className="w-full max-w-[500px] h-auto object-contain rounded-xl shadow-xl mb-4 transition-transform duration-300 hover:scale-105"
        />

        <h2 className="text-2xl font-semibold text-gray-800 mt-4 text-center">
          {translate("tatianaName")}
        </h2>
        {/* <p className="text-md text-gray-600 text-center">
          {translate("projectLead")}
        </p> */}
      </div>
    </div>
  );
};

export default AboutMe ;
