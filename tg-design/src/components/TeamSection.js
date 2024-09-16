import React from "react";
import image1 from "../Images/Tanya/3.jpg"; // Asegúrate de que esta ruta sea correcta

const TeamSection = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between p-10 lg:p-16 bg-gray-50">
      {/* Sección de texto */}
      <div className="lg:w-1/2 w-full mb-8 lg:mb-0 lg:pr-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-6 lg:text-left text-center">Проектная команда</h1>
        <p className="text-lg text-gray-700 leading-relaxed lg:text-left text-center">
        Привет! Я Татьяна Горшкова, дизайнер интерьера, с опытом работы над проектами в России и Эквадоре. Свободно владею английским, русским и испанским, что позволяет мне легко находить общий язык с клиентами по всему миру. В моем портфолио вы найдете разнообразие стилей — от утонченной неоклассики до смелого лофта. Однако для меня главным остается уникальность каждого проекта. Я люблю воплощать нестандартные и креативные решения, уделяя внимание каждой детали, чтобы интерьер не только подчеркивал индивидуальность клиента, но и создавал атмосферу уюта и эстетического удовольствия.
        </p>
      </div>
      
      {/* Sección de la imagen */}
      <div className="lg:w-1/2 w-full flex flex-col items-center">
        <img 
          src={image1} 
          alt="Project Team Member 1" 
          className="w-full h-64 lg:h-[450px] object-cover rounded-xl shadow-xl mb-4 transition-transform duration-300 hover:scale-105" 
        />
        <h2 className="text-2xl font-semibold text-gray-800 mt-4 text-center">Татьяна Горшкова</h2>
        <p className="text-md text-gray-600 text-center">Руководитель проекта</p>
      </div>
    </div>
  );
};

export default TeamSection;
