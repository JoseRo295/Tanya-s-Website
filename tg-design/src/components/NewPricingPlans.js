import React, { useState } from "react";
import { useLocalization } from "../context/LocalizationContext";
import { CheckIcon } from "@heroicons/react/24/outline";

// Función para generar la URL de WhatsApp
function getWhatsAppLink(packTitle) {
  const message = `Hello! I'm interested in the ${packTitle}. I'd like to get more information about this package`;
  return `https://wa.me/593983548611?text=${encodeURIComponent(message)}`;
}

export default function NewPricingPlans() {
  const { translate } = useLocalization();
  const [activeTab, setActiveTab] = useState("concept");

  const packages = [
    {
      id: "concept",
      title: translate("conceptPackageTitle"),
      subtitle: translate("conceptPackageSubtitle"),
      price: translate("conceptPackagePrice"),
      time: translate("conceptPackageTime"),
      features: translate("conceptPackageItems"),
      pdfLink: "/pdfs/Example_Concept.pdf",
    },
    {
      id: "100",
      title: translate("hundredPackageTitle"),
      subtitle: translate("hundredPackageSubtitle"),
      price: translate("hundredPackagePrice"),
      time: translate("hundredPackageTime"),
      features: translate("hundredPackageItems"),
      pdfLink: "/pdfs/Example_100.pdf",
      popular: true,
    },
    {
      id: "airbnb",
      title: translate("airbnbPackageTitle"),
      subtitle: translate("airbnbPackageSubtitle"),
      price: translate("airbnbPackagePrice"),
      time: translate("airbnbPackageTime"),
      features: translate("airbnbPackageItems"),
    },
    {
      id: "wow",
      title: translate("wowPackageTitle"),
      subtitle: translate("wowPackageSubtitle"),
      price: translate("wowPackagePrice"),
      time: translate("wowPackageTime"),
      features: translate("wowPackageItems"),
      pdfLink: "/pdfs/Example_WOW Effect.pdf ",
    },
  ];

  const activePackage = packages.find((p) => p.id === activeTab);

  return (
    <div className="py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">
          {translate("pricing")}
        </h2>

        {/* Tabs de Navegación */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {packages.map((pack) => (
            <button
              key={pack.id}
              onClick={() => setActiveTab(pack.id)}
              className={`
                px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide transition-all duration-300
                ${
                  activeTab === pack.id
                    ? "bg-[#FF5A5F] text-white shadow-md transform scale-105"
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                }
              `}
            >
              {pack.title.replace('Package "', '').replace('"', '').replace('Пакет «', '').replace('»', '')}
            </button>
          ))}
        </div>

        {/* Tarjeta de Precio Activa - Versión Ultra Compacta */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 flex flex-col md:flex-row h-auto md:h-[450px]">
            
            {/* Lado Izquierdo: Info Principal */}
            <div className="p-6 md:p-8 md:w-1/2 flex flex-col justify-center bg-gray-50">
              <h3 className="text-xl font-extrabold text-gray-900 mb-2">
                {activePackage.title}
              </h3>
              <p className="text-sm text-gray-600 mb-4 leading-snug">
                {activePackage.subtitle}
              </p>
              
              <div className="mt-auto">
                <p className="text-3xl font-bold text-[#FF5A5F] mb-1">
                  {activePackage.price}
                </p>
                <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wider mb-4">
                  {activePackage.time}
                </p>
                
                <a
                  href={getWhatsAppLink(activePackage.title)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-3 px-6 bg-[#FF5A5F] hover:bg-[#ff4449] text-white text-center font-bold rounded-xl shadow-lg transition-all duration-300 transform hover:-translate-y-1 text-sm"
                >
                  {translate("detailsButton")}
                </a>
                
                {activePackage.pdfLink && (
                  <a
                    href={activePackage.pdfLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center mt-2 text-[10px] font-semibold text-gray-500 hover:text-[#FF5A5F] transition-colors"
                  >
                    {translate("downloadBrochure")}
                  </a>
                )}
              </div>
            </div>

            {/* Lado Derecho: Lista de Características */}
            <div className="p-6 md:p-8 md:w-1/2 bg-white flex flex-col">
              <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">
                What's Included
              </h4>
              <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                <ul className="space-y-2">
                  {activePackage.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <div className="flex-shrink-0 w-4 h-4 rounded-full bg-green-100 flex items-center justify-center mr-2 mt-0.5">
                        <CheckIcon className="w-3 h-3 text-green-600" />
                      </div>
                      <span className="text-xs text-gray-700 leading-snug">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </div>
      </div>
      
      {/* Estilos para el scrollbar */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #e5e7eb; border-radius: 10px; }
      `}</style>
    </div>
  );
}
