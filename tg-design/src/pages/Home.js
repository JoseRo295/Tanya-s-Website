    import Header from "../components/Header";
    import Corrusel from "../components/Corrusel";
    import AboutMe from "../components/AboutMe ";
    import ProjectCarousel from "../components/ProjectCarousel";
    import ContactForm from "../components/Contact";
    // import Services from "../components/Services";
    import WhatsAppButton from "../components/WhatsAppButton";
    import { useEffect } from 'react';
    import AOS from 'aos';
    import 'aos/dist/aos.css'; // Importar los estilos de AOS
    import AirbnbOfferBanner from "../components/AirbnbOfferBanner";
    import NewPricingPlans from "../components/NewPricingPlans";

    export default function Home() {
        useEffect(() => {
            AOS.init({ 
                duration: 800,     // Reducido de 1000 a 800 para mayor agilidad
                offset: 100,       // Reducido de 200 a 100 para que aparezcan antes
                once: true,        // La animación ocurre solo una vez
                easing: 'ease-out-cubic', // Curva de animación más suave
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
        );
    }
