import React from "react";
import image1 from "../Images/Tanya/6.jpg"; // Asegúrate de que esta ruta sea correcta
import { useLocalization } from "../context/LocalizationContext"; // Importar el contexto de localización

const AboutMe = () => {
  const { translate } = useLocalization(); // Usar la función translate

  // Separar el texto en párrafos con más espacio visual
  const description = translate("teamDescription");
  const sentences = description.split(". ");
  const firstSentence = sentences.slice(0, 1).join(". ") + ".";
  const secondParagraph = sentences.slice(1, 3).join(". ") + ".";
  const thirdParagraph = sentences.slice(3, 5).join(". ") 
  const fourthParagraph = sentences.slice(5).join(". ");
  
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between p-10 lg:p-16 bg-gray-50">
      {/* Sección de texto */}
      <div className="lg:w-1/2 w-full mb-8 lg:mb-0 lg:pr-8 text-center lg:text-left">
        {/* Primera oración en grande y negrita */}
        <p className="text-3xl font-bold text-gray-900 mb-4">{firstSentence}</p>

        {/* Segundo, tercero y cuarto párrafo con más espaciado */}
        <p className="text-lg text-gray-700 leading-relaxed mb-4">{secondParagraph}</p>
        <p className="text-lg text-gray-700 leading-relaxed mb-4">{thirdParagraph}</p>
        <p className="text-lg text-gray-700 leading-relaxed">{fourthParagraph}</p>
      </div>

      {/* Sección de la imagen */}
      <div className="lg:w-1/2 w-full flex flex-col items-center">
        <img
          src={image1}
          alt="Tatiana Gorshkova"
          className="w-full max-w-[500px] h-auto object-cover rounded-xl shadow-lg transition-transform duration-300 hover:scale-105"
        />
        <h2 className="text-2xl font-semibold text-gray-800 mt-4 text-center">
          {translate("tatianaName")}
        </h2>
      </div>
    </div>
  );
};

export default AboutMe;
