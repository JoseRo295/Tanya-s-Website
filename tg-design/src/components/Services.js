import React from 'react';
import image1 from "../Images/Services/1.jpeg";
import image2 from "../Images/Services/2.jpeg";
import image3 from "../Images/Services/3.jpeg";
import image4 from "../Images/Services/4.jpeg";
import image5 from "../Images/Services/5.jpeg";
import image6 from "../Images/Services/6.jpeg";
import Button from "../components/Button.js";
import { useLocalization } from '../context/LocalizationContext'; // Importar el contexto de localización

export default function Home() {
  const { translate } = useLocalization(); // Usar la función translate

  return (
    <div className="pt-10">
      <div className="container mx-auto text-center mb-8">
        <h2 className="text-4xl font-bold text-gray-800">{translate("nuestrosServicios")}</h2>
      </div>
      <main className="pt-5 px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
        {[
          {
            id: "service1",
            image: image1,
            title: translate('paqueteEsencial'),
            items: [
              translate("tomaDeMedidas"),
              translate("planAmoblamiento"),
              translate("planosElectricos"),
              translate("planosLuz"),
            ],
          },
          {
            id: "service2",
            image: image2,
            title: translate('paqueteConcepto'),
            items: [
              translate("paqueteEsencial"),
              translate("moodboards"),
              translate("collagesConceptuales"),
              translate("plantaBaja"),
              translate("planTecho"),
              translate("shoppingList"),
            ],
          },
          {
            id: "service3",
            image: image3,
            title: translate('paqueteEfectoWOW'),
            items: [
              translate("paqueteConcepto"),
              translate("visualizaciones3D"),
              translate("rendersMueblesPersonalizados"),
              translate("visitasSitio"),
            ],
          },
          {
            id: "service4",
            image: image4,
            title: translate('paquete100'),
            items: [
              translate("paqueteEfectoWOW"),
              translate("panoramica360"),
              translate("compraMuebles"),
              translate("controlEntregas"),
            ],
          },
          {
            id: "service5",
            image: image5,
            title: translate('paqueteDecoracion'),
            items: [
              translate("moodboards"),
              translate("collagesConceptuales"),
              translate("shoppingList"),
            ],
          },
          {
            id: "service6",
            image: image6,
            title: translate('paqueteConsulta'),
            items: [
              translate("consultaTiempo"),
              translate("respuestasPreguntas"),
              translate("materialesFinales"),
            ],
          },
        ].map((service, index) => (
          <div
            key={index}
            className="w-full max-w-sm min-h-[28rem] sm:min-h-[32rem] lg:min-h-[36rem] rounded-lg relative overflow-hidden flex flex-col"
            id={service.id}
            style={{
              backgroundImage: `url(${service.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="flex-1 p-6 m-4 sm:p-6 lg:p-8 flex flex-col bg-[#a79584] bg-opacity-60 rounded-lg">
              <h2 className="text-white text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4 lg:mb-6">
                {service.title}
              </h2>
              <ul className="text-white text-sm sm:text-base lg:text-lg space-y-1 sm:space-y-2 lg:space-y-3">
                {service.items.map((item, idx) => (
                  <li key={idx}>• {item}</li>
                ))}
              </ul>
              <div className="mt-auto flex justify-center p-3">
                <Button
                  className="text-white text-xs sm:text-sm lg:text-base mt-2 sm:mt-4 lg:mt-6 italic"
                  onClick={() => console.log("Botón clickeado")}
                >
                  {translate("choosePackage")}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
