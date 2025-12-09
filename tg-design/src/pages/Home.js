    import Header from "../components/Header";
    import Corrusel from "../components/Corrusel";
    import AboutMe from "../components/AboutMe ";
    import ProjectCarousel from "../components/ProjectCarousel";
    import ContactForm from "../components/Contact";
    // import Services from "../components/Services";
    import WhatsAppButton from "../components/WhatsAppButton";
    import { useEffect, useState } from 'react';
    import AOS from 'aos';
    import 'aos/dist/aos.css'; // Importar los estilos de AOS
    import AirbnbOfferBanner from "../components/AirbnbOfferBanner";
    import NewPricingPlans from "../components/NewPricingPlans";
    import Preloader from "../components/Preloader";

    // Importamos las imágenes críticas para precargarlas
    import image1 from "../Images/corrusel/7.png";
    import image2 from "../Images/corrusel/8.png";
    import image3 from "../Images/corrusel/9.png";
    import image4 from "../Images/corrusel/10.png";

    export default function Home() {
        const [isLoading, setIsLoading] = useState(true);

        useEffect(() => {
            // Inicializar AOS
            AOS.init({ 
                duration: 800,
                offset: 50,
                once: true,
                easing: 'ease-out-cubic',
                disable: 'phone',
            });

            // Lógica de Precarga de Imágenes
            const imagesToPreload = [image1, image2, image3, image4];
            
            const cacheImages = async (srcArray) => {
                const promises = await srcArray.map((src) => {
                    return new Promise(function (resolve, reject) {
                        const img = new Image();
                        img.src = src;
                        img.onload = resolve();
                        img.onerror = resolve(); // Resolvemos incluso si falla para no bloquear la app
                    });
                });

                await Promise.all(promises);
                
                // Pequeño timeout artificial para asegurar que la transición sea suave
                setTimeout(() => {
                    setIsLoading(false);
                }, 800);
            };

            cacheImages(imagesToPreload);
        }, []);
        
        return (
            <div>
                {/* Preloader con transición de desvanecimiento */}
                <div className={`fixed inset-0 z-[9999] transition-opacity duration-700 pointer-events-none ${isLoading ? 'opacity-100' : 'opacity-0'}`}>
                    {isLoading && <Preloader />}
                </div>

                {/* Contenido principal (visible pero detrás del preloader inicialmente) */}
                <div className={`transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
                    <Header />
                    <section id="home">
                        <Corrusel />
                    </section>
                    <section id="aboutMe" data-aos="fade-up">
                        <AboutMe />
                    </section>
                    <section id="projectCarousel" data-aos="fade-up">
                        <ProjectCarousel />
                    </section>
                    <section id="newpricingplans" data-aos="fade-up">
                        <NewPricingPlans /> 
                    </section>
                    {/* <section id="airbnbofferbanner" data-aos="fade-up">
                        <AirbnbOfferBanner />
                    </section> */}
                    <section id="contact" data-aos="fade-up">
                        <ContactForm />
                    </section>
                    <WhatsAppButton />
                </div>
            </div>
        );
    }
