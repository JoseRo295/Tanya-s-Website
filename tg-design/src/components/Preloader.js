import React from 'react';
import logo from '../Images/tgDesign.png'; // Asegúrate de que la ruta al logo sea correcta

const Preloader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white transition-opacity duration-700">
      <div className="relative flex flex-col items-center">
        {/* Logo con animación de pulso sutil */}
        <img 
          src={logo} 
          alt="TG Design Loading" 
          className="h-20 w-auto animate-pulse mb-8"
        />
        
        {/* Barra de carga elegante */}
        <div className="w-48 h-1 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-[#FF5A5F] animate-[loading_1.5s_ease-in-out_infinite] w-full origin-left transform -translate-x-full"></div>
        </div>
        
        <p className="mt-4 text-xs font-medium text-gray-400 uppercase tracking-[0.2em] animate-pulse">
          Loading Experience
        </p>
      </div>

      <style>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default Preloader;
