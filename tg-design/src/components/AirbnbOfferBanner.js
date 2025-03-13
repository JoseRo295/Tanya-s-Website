import React from "react";
import { useLocalization } from "../context/LocalizationContext"; // Importar el contexto de localización

const openWhatsApp = (message) => {
  const phoneNumber = "+593983548611"; // Reemplázalo con tu número real
  const encodedMessage = encodeURIComponent(message);
  const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  window.open(url, "_blank");
};


const AirbnbOfferBanner = () => {
  const { translate } = useLocalization(); // Usar traducción según el idioma seleccionado

  return (
    <div className="w-full bg-[#EDEAE3] text-center py-10 px-6 rounded-xl shadow-lg my-10">
      <h2 className="text-3xl sm:text-4xl font-bold text-[#3E3A39] mb-4">
        {translate("airbnbOfferTitle")}
      </h2>
      <p className="text-lg sm:text-xl text-[#6D6A68] mb-6">
        {translate("airbnbOfferText")}
      </p>
      <button
        onClick={openWhatsApp}
        className="bg-[#A8957A] hover:bg-[#8C7A5F] text-white font-semibold py-3 px-6 rounded-lg text-lg transition duration-300"
      >
        {translate("whatsappButton")}
      </button>
    </div>
  );
};

export default AirbnbOfferBanner;
