import Header from "../components/Header";
import Corrusel from "../components/Corrusel";
import TeamSection from "../components/TeamSection";
import ProjectCarousel from "../components/ProjectCarousel";
import ContactForm from "../components/Contact";
import Services from "../components/Services";
import WhatsAppButton from "../components/WhatsAppButton";

export default function Home() {
    
    return (
        <div>
            <Header/>
            <Corrusel/>
            <Services/>
            <TeamSection/>
            <ProjectCarousel/>
            <ContactForm/>
           <WhatsAppButton/>  
        </div>
    
    );
}
