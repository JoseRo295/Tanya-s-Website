import image1 from "../Images/Services/1.jpeg";
import image2 from "../Images/Services/2.jpeg";
import image3 from "../Images/Services/3.jpeg";
import image4 from "../Images/Services/4.jpeg";
import image5 from "../Images/Services/5.jpeg";
import image6 from "../Images/Services/6.jpeg";
import Button from "../components/Button.js";

export default function Home() {
  return (
    <div className="pt-10">
      <div className="container mx-auto text-center mb-8">
        <h2 className="text-4xl font-bold text-gray-800">Nuestros Servicios</h2>
      </div>
      <main className="pt-5 px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
        {[
          {
            id: "service1",
            image: image1,
            title: 'Paquete "Esencial"',
            items: [
              "Toma de medidas de habitaciones (Quito, Tumbaco, Cumbaya)",
              "Plan de amoblamiento (hasta 3 opciones)",
              "Planos eléctricos (enchufes, interruptores)",
              "Planos de luz",
            ],
          },
          {
            id: "service2",
            image: image2,
            title: 'Paquete "Concepto"',
            items: [
              'Paquete "Esencial"',
              "Moodboards",
              "Collages conceptuales para cada habitación",
              "Planta baja",
              "Plan de techo",
              "Shopping list",
            ],
          },
          {
            id: "service3",
            image: image3,
            title: 'Paquete "Efecto WOW"',
            items: [
              'Paquete "Concepto"',
              "Visualizaciones 3D del concepto seleccionado (3-10 renders para cada habitación)",
              "Renders de muebles personalizados",
              "3 visitas al sitio durante el proceso de renovación",
            ],
          },
          {
            id: "service4",
            image: image4,
            title: 'Paquete "100%"',
            items: [
              'Paquete "Efecto WOW"',
              "Panorámica 360 de cada habitación",
              "Compra de muebles, decoración",
              "Control y aceptación de entregas de muebles",
            ],
          },
          {
            id: "service5",
            image: image5,
            title: 'Paquete "Decoración"',
            items: [
              "Moodboards",
              "Collages conceptuales para cada habitación",
              "Shopping list",
            ],
          },
          {
            id: "service6",
            image: image6,
            title: 'Paquete "Consulta"',
            items: [
              "30 minutos/1 hora",
              "Respuestas a tus preguntas sobre tu diseño interior",
              "Materiales finales después de la consulta",
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
                  Elige este paquete
                </Button>
              </div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
