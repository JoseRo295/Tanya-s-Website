import React from "react";
import image1 from "../Images/Tanya/3.jpg"; // Asegúrate de que esta ruta sea correcta

const TeamSection = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between p-10 lg:p-16 bg-gray-50">
      <div className="lg:w-1/2 w-full mb-8 lg:mb-0">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Проектная команда</h1>
        <p className="text-lg text-gray-700 leading-relaxed">
          Помимо руководителей над каждым проектом трудится как минимум 3 специалиста - дизайнер, архитектор и менеджер по комплектации. Каждый специалист выполняет узкопрофильные задачи – так мы добиваемся высочайшего качества на каждом этапе проектирования.
        </p>
      </div>
      <div className="lg:w-1/2 w-full flex flex-col items-center">
        <img 
          src={image1} 
          alt="Project Team Member 1" 
          className="w-full h-64 lg:h-96 object-cover rounded-xl shadow-xl mb-4 transition-transform duration-300 hover:scale-105" 
        />
        <h2 className="text-2xl font-semibold text-gray-800 mt-4">Татьяна Горшкова</h2>
        <p className="text-md text-gray-600">Руководитель проекта</p>
      </div>
    </div>
  );
};

export default TeamSection;
