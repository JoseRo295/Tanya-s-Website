    import Header from "../components/Header";
    import Corrusel from "../components/Corrusel";
    import AboutMe from "../components/AboutMe ";
    import ProjectCarousel from "../components/ProjectCarousel";
    import ContactForm from "../components/Contact";
    import Services from "../components/Services";
    import WhatsAppButton from "../components/WhatsAppButton";
    import { useEffect } from 'react';
    import AOS from 'aos';
    import 'aos/dist/aos.css'; // Importar los estilos de AOS
    import AirbnbOfferBanner from "../components/AirbnbOfferBanner";

    export default function Home() {
        useEffect(() => {
            AOS.init({ 
                duration: 1000,    // Duración de la animación
                offset: 200,       // Ajusta el desplazamiento en px (comienza 200px antes de que el elemento entre en el viewport)
                once: true,        // La animación ocurre solo una vez
                disable: 'phone',  // Desactiva las animaciones en teléfonos
            });
        }, []);
        
        return (
            <div>
                <Header />
                <section id="home" data-aos="fade-up">
                    <Corrusel />
                </section>
                <section id="aboutMe" data-aos="fade-up">
                    <AboutMe />
                </section>
                <section id="projectCarousel" data-aos="fade-up">
                    <ProjectCarousel />
                </section>
                <section id="services" data-aos="fade-up">
                    <Services />
                </section>
                <section id="airbnbofferbanner" data-aos="fade-up">
                    <AirbnbOfferBanner />
                </section>
                <section id="contact" data-aos="fade-up">
                    <ContactForm />
                </section>
                <WhatsAppButton />
            </div>
        );
    }
