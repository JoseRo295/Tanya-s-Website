import React from "react";
import { useLocalization } from "../context/LocalizationContext";

// Función para generar la URL de WhatsApp con mensaje personalizado
function getWhatsAppLink(packTitle) {
  // Mensaje en inglés
  const message = `Hello! I'm interested in the ${packTitle}. I'd like to get more information about this package`;
  // Reemplaza 593XXXXXXXXX con tu número de WhatsApp
  return `https://wa.me/593983548611?text=${encodeURIComponent(message)}`;
}

export default function NewPricingPlans() {
  const { translate } = useLocalization();

  // Paquetes en el orden: Concept, 100%, Airbnb, WOW
  const packages = [
    {
      id: "concept",
      title: translate("conceptPackageTitle"),
      subtitle: translate("conceptPackageSubtitle"),
      price: translate("conceptPackagePrice"),
      time: translate("conceptPackageTime"),
      features: translate("conceptPackageItems"),
    },
    {
      id: "100",
      title: translate("hundredPackageTitle"),
      subtitle: translate("hundredPackageSubtitle"),
      price: translate("hundredPackagePrice"),
      time: translate("hundredPackageTime"),
      features: translate("hundredPackageItems"),
    },
    {
      id: "airbnb", // Paquete especial
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
    },
  ];

  return (
    <div className="py-10 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          {translate("pricing")}
        </h2>

        {/* 
          Grid responsivo:
          1 columna en móviles,
          2 en pantallas pequeñas,
          3 en pantallas medianas,
          4 en pantallas grandes.
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 items-stretch">
          {packages.map((pack) => {
            const isAirbnb = pack.id === "airbnb"; // Detectar paquete especial

            return (
              <div
                key={pack.id}
                className={`
                  flex flex-col
                  justify-between
                  rounded-xl 
                  p-6 
                  shadow-md 
                  transition-all 
                  duration-300 
                  hover:shadow-2xl 
                  hover:-translate-y-1
                  h-full
                  w-full
                  max-w-xs
                  min-h-[550px]
                  mx-auto
                  ${
                    isAirbnb
                      ? `
                        /* Estilos ESPECIALES para Airbnb */
                        border border-[#FF5A5F]
                        bg-[#FFF5F5]
                        group
                        hover:border-[#FD3A3F]
                      `
                      : `
                        /* Estilos NORMALES para otros paquetes */
                        border border-gray-200
                        bg-white
                        hover:border-[#556B2F]
                        group
                      `
                  }
                `}
              >
                {/* Contenido Superior */}
                <div>
                  <h3
                    className={`
                      text-xl font-semibold mb-1
                      ${
                        isAirbnb
                          ? "text-[#FF5A5F]" // Título en color Airbnb
                          : "text-gray-800"
                      }
                    `}
                  >
                    {pack.title}
                  </h3>
                  <p
                    className={`
                      text-sm mb-2
                      ${
                        isAirbnb
                          ? "text-[#FF5A5F]/80" // Subtítulo un poco más claro
                          : "text-gray-600"
                      }
                    `}
                  >
                    {pack.subtitle}
                  </p>

                  <p
                    className={`
                      text-lg font-bold mb-1
                      ${
                        isAirbnb
                          ? "text-[#FF5A5F]"
                          : "text-[#556B2F]"
                      }
                    `}
                  >
                    {pack.price}
                  </p>
                  <p className="text-gray-500 text-sm italic mb-4">
                    {pack.time}
                  </p>

                  <ul className="list-disc list-inside mb-6 space-y-1 text-gray-700">
                    {pack.features.map((feature, i) => (
                      <li key={i}>{feature}</li>
                    ))}
                  </ul>
                </div>

                {/* Botón de WhatsApp con mensaje personalizado */}
                <a
                  href={getWhatsAppLink(pack.title)} // Usamos la función
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`
                    inline-block 
                    w-full 
                    text-center 
                    px-4 
                    py-2 
                    font-bold 
                    rounded 
                    transition-colors 
                    duration-300
                    ${
                      isAirbnb
                        ? `
                          bg-[#FF5A5F] 
                          text-white
                          group-hover:bg-[#FD3A3F]
                        `
                        : `
                          bg-[#556B2F] 
                          text-white
                          group-hover:bg-[#6B8E23]
                        `
                    }
                  `}
                >
                  {translate("detailsButton")}
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
