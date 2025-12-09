import React, { useState, useEffect } from "react";
import { useLocalization } from "../context/LocalizationContext";
import logoLight from "../Images/tgDesign.png";
import { Link } from "react-scroll";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { translate, switchLanguage } = useLocalization();
  const [scrollProgress, setScrollProgress] = useState(0);

  // Manejar el progreso del scroll
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav className="bg-white/95 backdrop-blur-md border-b border-gray-100 px-4 sm:px-6 py-3 sm:py-4 shadow-sm sticky top-0 z-[50] transition-all duration-300">
        <div className="container flex flex-wrap justify-between items-center mx-auto">
          {/* Logo */}
          <a href="/" className="flex items-center group z-50">
            <img
              src={logoLight}
              alt="Logotipo"
              className="h-10 sm:h-14 w-auto block transition-transform duration-300 group-hover:scale-105"
            />
          </a>

          {/* Contenedor derecho (idiomas en móvil + botón hamburguesa) */}
          <div className="flex items-center gap-2 md:hidden z-50">
            {/* Botones de idioma para MOBILE */}
            <div className="flex space-x-1 mr-1">
              {['ru', 'en', 'es'].map((lang) => (
                <button
                  key={lang}
                  onClick={(e) => {
                    switchLanguage(lang, e);
                    setIsOpen(false);
                  }}
                  className="text-[10px] font-bold uppercase text-gray-500 hover:text-[#FF5A5F] transition duration-200 px-1.5 py-1 rounded hover:bg-gray-50 border border-gray-200"
                >
                  {lang}
                </button>
              ))}
            </div>

            {/* Botón hamburguesa */}
            <button
              id="menu-toggle"
              type="button"
              className="inline-flex items-center p-2 text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none transition-colors"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Menú desplegable (Desktop y Mobile Overlay) */}
          <div
            className={`
              fixed inset-0 bg-white z-40 flex flex-col items-center justify-center space-y-8 transition-transform duration-300 md:relative md:inset-auto md:bg-transparent md:flex-row md:space-y-0 md:justify-end md:w-auto md:block md:translate-x-0
              ${isOpen ? "translate-x-0" : "translate-x-full"}
            `}
          >
            <ul className="flex flex-col md:flex-row md:items-center md:space-x-8 text-xl md:text-base font-medium text-center">
              {[
                { to: "home", label: "home" },
                { to: "aboutMe", label: "aboutMe" },
                { to: "projectCarousel", label: "proyectos" },
                { to: "newpricingplans", label: "services" },
                { to: "contact", label: "contacts" },
              ].map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    smooth={true}
                    duration={800}
                    offset={-80} // Offset ajustado para no tapar títulos
                    onClick={() => setIsOpen(false)}
                    className="block py-3 px-4 text-gray-700 font-medium hover:text-[#FF5A5F] hover:bg-gray-50 md:hover:bg-transparent rounded-lg 
                               transition duration-300 cursor-pointer"
                  >
                    {translate(item.label)}
                  </Link>
                </li>
              ))}

              {/* Separador vertical desktop */}
              <li className="hidden md:block h-5 w-px bg-gray-300 mx-2"></li>

              {/* Botones de idioma para DESKTOP */}
              <li className="hidden md:flex gap-1">
                {['ru', 'en', 'es'].map((lang) => (
                  <button
                    key={lang}
                    onClick={(e) => switchLanguage(lang, e)}
                    className="py-1 px-2 text-xs font-bold uppercase text-gray-500 hover:text-[#FF5A5F] hover:bg-gray-50 rounded-md transition duration-200"
                  >
                    {lang}
                  </button>
                ))}
              </li>
            </ul>
          </div>
        </div>
        
        {/* Barra de Progreso de Lectura */}
        <div 
          className="absolute bottom-0 left-0 h-[2px] bg-[#FF5A5F] transition-all duration-100 ease-out z-[60]"
          style={{ width: `${scrollProgress}%` }}
        />
      </nav>
    </>
  );
};

export default Header;
