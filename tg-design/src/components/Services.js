import image1 from "../Images/Services/1.jpeg";
import image2 from "../Images/Services/2.jpeg";
import image3 from "../Images/Services/3.jpeg";
import image4 from "../Images/Services/4.jpeg";
import image5 from "../Images/Services/5.jpeg";
import image6 from "../Images/Services/6.jpeg";
import Button from "../components/Button.js";

export default function Home() {
  return (
    <div>
      <main className="pt-5 px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
        <div
          className="w-full max-w-sm h-80 sm:h-96 lg:h-[28rem] rounded-lg relative overflow-hidden"
          id="service1"
          style={{
            backgroundImage: `url(${image1})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="absolute inset-0 bg-[#a79584] bg-opacity-60 flex flex-col justify-center p-6 m-4 sm:p-6 lg:p-8 rounded-lg">
            <h2 className="text-white text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4 lg:mb-6">
              Paquete "Esencial"
            </h2>
            <ul className="text-white text-sm sm:text-base lg:text-lg space-y-1 sm:space-y-2 lg:space-y-3">
              <li>
                • Toma de medidas de habitaciones (Quito, Tumbaco, Cumbaya)
              </li>
              <li>• Plan de amoblamiento (hasta 3 opciones)</li>
              <li>• Planos eléctricos (enchufes, interruptores)</li>
              <li>• Planos de luz</li>
            </ul>

            <div className="flex justify-center p-3">
              <Button
                className="text-white  text-xs sm:text-sm lg:text-base mt-2 sm:mt-4 lg:mt-6 italic"
                onClick={() => console.log("Botón clickeado")}
              >
                Elige este paquete
              </Button>
            </div>
          </div>
        </div>

        <div
          className="w-full max-w-sm h-80 sm:h-96 lg:h-[28rem] rounded-lg relative overflow-hidden"
          id="service2"
          style={{
            backgroundImage: `url(${image2})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="absolute inset-0 bg-[#a79584] bg-opacity-60 flex flex-col justify-center p-6 m-4 sm:p-6 lg:p-8 rounded-lg">
            <h2 className="text-white text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4 lg:mb-6">
              Paquete "Concepto"
            </h2>
            <ul className="text-white text-sm sm:text-base lg:text-lg space-y-1 sm:space-y-2 lg:space-y-3">
              <li>• Paquete "Esencial"</li>
              <li>• Moodboards</li>
              <li>• Collages conceptuales para cada habitación</li>
              <li>• Planta baja</li>
              <li>• Plan de techo</li>
              <li>• Shopping list</li>
            </ul>
            <div>
              <div className="flex justify-center p-3">
                <Button
                  className="text-white  text-xs sm:text-sm lg:text-base mt-2 sm:mt-4 lg:mt-6 italic"
                  onClick={() => console.log("Botón clickeado")}
                >
                  Elige este paquete
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div
          className="w-full max-w-sm h-80 sm:h-96 lg:h-[28rem] rounded-lg relative overflow-hidden"
          id="service3"
          style={{
            backgroundImage: `url(${image3})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="absolute inset-0 bg-[#a79584] bg-opacity-60 flex flex-col justify-center p-6 m-4 sm:p-6 lg:p-8 rounded-lg">
            <h2 className="text-white text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4 lg:mb-6">
              Paquete "Efecto WOW"
            </h2>
            <ul className="text-white text-sm sm:text-base lg:text-lg space-y-1 sm:space-y-2 lg:space-y-3">
              <li>• Paquete "Concepto"</li>
              <li>
                • Visualizaciones 3D del concepto seleccionado (3-10 renders
                para cada habitación)
              </li>
              <li>• Renders de muebles personalizados</li>
              <li>• 3 visitas al sitio durante el proceso de renovación</li>
            </ul>
            <div className="flex justify-center p-3">
              <Button
                className="text-white  text-xs sm:text-sm lg:text-base mt-2 sm:mt-4 lg:mt-6 italic"
                onClick={() => console.log("Botón clickeado")}
              >
                Elige este paquete
              </Button>
            </div>
          </div>
        </div>

        <div
          className="w-full max-w-sm h-80 sm:h-96 lg:h-[28rem] rounded-lg relative overflow-hidden"
          id="service4"
          style={{
            backgroundImage: `url(${image4})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="absolute inset-0 bg-[#a79584] bg-opacity-60 flex flex-col justify-center p-6 m-4 sm:p-6 lg:p-8 rounded-lg">
            <h2 className="text-white text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4 lg:mb-6">
              Paquete "100%"
            </h2>
            <ul className="text-white text-sm sm:text-base lg:text-lg space-y-1 sm:space-y-2 lg:space-y-3">
              <li>
                • Paquete "Efecto WOW"
              </li>
              <li>• Panorámica 360 de cada habitación</li>
              <li>• Compra de muebles, decoración</li>
              <li>• Control y aceptación de entregas de muebles </li>
            </ul>
            <div className="flex justify-center p-3">
              <Button
                className="text-white  text-xs sm:text-sm lg:text-base mt-2 sm:mt-4 lg:mt-6 italic"
                onClick={() => console.log("Botón clickeado")}
              >
                Elige este paquete
              </Button>
            </div>
          </div>
        </div>

        <div
          className="w-full max-w-sm h-80 sm:h-96 lg:h-[28rem] rounded-lg relative overflow-hidden"
          id="service5"
          style={{
            backgroundImage: `url(${image5})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="absolute inset-0 bg-[#a79584] bg-opacity-60 flex flex-col justify-center p-6 m-4 sm:p-6 lg:p-8 rounded-lg">
            <h2 className="text-white text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4 lg:mb-6">
              Paquete "Decoración"
            </h2>
            <ul className="text-white text-sm sm:text-base lg:text-lg space-y-1 sm:space-y-2 lg:space-y-3">
              <li>
                • Moodboars
              </li>
              <li>• Collages conceptuales para cada habitación</li>
              <li>• Shopping list</li>
            </ul>
            <div className="flex justify-center p-3">
              <Button
                className="text-white  text-xs sm:text-sm lg:text-base mt-2 sm:mt-4 lg:mt-6 italic"
                onClick={() => console.log("Botón clickeado")}
              >
                Elige este paquete
              </Button>
            </div>
          </div>
        </div>

        <div
          className="w-full max-w-sm h-80 sm:h-96 lg:h-[28rem] rounded-lg relative overflow-hidden"
          id="service6"
          style={{
            backgroundImage: `url(${image6})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="absolute inset-0 bg-[#a79584] bg-opacity-60 flex flex-col justify-center p-6 m-4 sm:p-6 lg:p-8 rounded-lg">
            <h2 className="text-white text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4 lg:mb-6">
              Paquete "Consulta"
            </h2>
            <ul className="text-white text-sm sm:text-base lg:text-lg space-y-1 sm:space-y-2 lg:space-y-3">
              <li>
                • 30 minutos/1 hora
              </li>
              <li>• Respuestas a tus preguntas sobre tu diseño interior
              </li>
              <li>• Materiales finales después de la consulta</li>
            </ul>
            <div className="flex justify-center p-3">
              <Button
                className="text-white  text-xs sm:text-sm lg:text-base mt-2 sm:mt-4 lg:mt-6 italic"
                onClick={() => console.log("Botón clickeado")}
              >
                Elige este paquete
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
