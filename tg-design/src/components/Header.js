import React, { useState } from "react";
import { useLocalization } from "../context/LocalizationContext";
import logoLight from "../Images/tgDesign.png";
import logoDark from "../Images/tgDesig_white.png"
import SocialIcons from "../components/SocialIcons";
import { Link } from "react-scroll";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { translate, switchLanguage } = useLocalization();

  return (
    <nav className="bg-white border-b border-gray-200 dark:border-gray-700 px-4 py-3 shadow-md dark:bg-gray-800 sticky top-0 z-50">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        {/* Logo */}
        <a href="/" className="flex items-center">
 
          <img
            src={logoLight}
            alt="Logotipo claro"
            className="h-16 w-auto block dark:hidden"
          />
          
          <img
            src={logoDark}
            alt="Logotipo oscuro"
            className="h-16 w-auto hidden dark:block"
          />
        </a>


        {/* Contenedor derecho (idiomas en móvil + botón hamburguesa) */}
        <div className="flex items-center">
          {/* Botones de idioma para MOBILE (ocultos en desktop) */}
          <div className="flex space-x-2 mr-2 md:hidden">
            <button
              onClick={(e) => {
                switchLanguage("ru", e);
                setIsOpen(false);
              }}
              className="text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition duration-200"
            >
              Ru
            </button>
            <button
              onClick={(e) => {
                switchLanguage("en", e);
                setIsOpen(false);
              }}
              className="text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition duration-200"
            >
              En
            </button>
            <button
              onClick={(e) => {
                switchLanguage("es", e);
                setIsOpen(false);
              }}
              className="text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition duration-200"
            >
              Es
            </button>
          </div>

          {/* Botón hamburguesa */}
          <button
            id="menu-toggle"
            type="button"
            className="inline-flex items-center p-2 text-gray-500 rounded-lg hover:bg-gray-100 
                       focus:outline-none focus:ring-2 focus:ring-gray-200 
                       dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>

        {/* Menú desplegable (versión desktop y móvil) */}
        <div className={`${isOpen ? "block" : "hidden"} w-full md:block md:w-auto`}>
          <ul className="flex flex-col md:flex-row md:space-x-8 mt-4 md:mt-0 text-lg font-medium">
            <li>
              <Link
                to="home"
                smooth={true}
                duration={500}
                offset={-80}
                onClick={() => setIsOpen(false)}
                className="block pt-5 py-2 pr-4 pl-3 text-gray-900 hover:text-blue-600 
                           dark:text-white dark:hover:text-blue-400 transition duration-200 cursor-pointer"
              >
                {translate("home")}
              </Link>
            </li>
            <li>
              <Link
                to="aboutMe"
                smooth={true}
                duration={500}
                offset={-80}
                onClick={() => setIsOpen(false)}
                className="block pt-5 py-2 pr-4 pl-3 text-gray-900 hover:text-blue-600 
                           dark:text-white dark:hover:text-blue-400 transition duration-200 cursor-pointer"
              >
                {translate("aboutMe")}
              </Link>
            </li>
            <li>
              <Link
                to="projectCarousel"
                smooth={true}
                duration={500}
                offset={-80}
                onClick={() => setIsOpen(false)}
                className="block pt-5 py-2 pr-4 pl-3 text-gray-900 hover:text-blue-600 
                           dark:text-white dark:hover:text-blue-400 transition duration-200 cursor-pointer"
              >
                {translate("proyectos")}
              </Link>
            </li>
            <li>
              <Link
                to="newpricingplans"
                smooth={true}
                duration={500}
                offset={-80}
                onClick={() => setIsOpen(false)}
                className="block pt-5 py-2 pr-4 pl-3 text-gray-900 hover:text-blue-600 
                           dark:text-white dark:hover:text-blue-400 transition duration-200 cursor-pointer"
              >
                {translate("services")}
              </Link>
            </li>
            {/* <li>
              <Link
                to="airbnbofferbanner"
                smooth={true}
                duration={500}
                offset={-80}
                onClick={() => setIsOpen(false)}
                className="block pt-5 py-2 pr-4 pl-3 text-gray-900 hover:text-blue-600 
                           dark:text-white dark:hover:text-blue-400 transition duration-200 cursor-pointer"
              >
                {translate("airbnbOffer")}
              </Link>
            </li> */}
            <li>
              <Link
                to="contact"
                smooth={true}
                duration={500}
                offset={-80}
                onClick={() => setIsOpen(false)}
                className="block pt-5 py-2 pr-4 pl-3 text-gray-900 hover:text-blue-600 
                           dark:text-white dark:hover:text-blue-400 transition duration-200 cursor-pointer"
              >
                {translate("contacts")}
              </Link>
            </li>

            {/* Botones de idioma para DESKTOP (ocultos en móvil) */}
            <li className="hidden md:inline-block">
              <button
                onClick={(e) => {
                  switchLanguage("ru", e);
                  setIsOpen(false);
                }}
                className="pt-5 py-2 pr-4 pl-3 text-gray-700 hover:text-blue-600 
                           dark:text-gray-400 dark:hover:text-blue-400 transition duration-200"
              >
                Ru
              </button>
            </li>
            <li className="hidden md:inline-block">
              <button
                onClick={(e) => {
                  switchLanguage("en", e);
                  setIsOpen(false);
                }}
                className="pt-5 py-2 pr-4 pl-3 text-gray-700 hover:text-blue-600 
                           dark:text-gray-400 dark:hover:text-blue-400 transition duration-200"
              >
                En
              </button>
            </li>
            <li className="hidden md:inline-block">
              <button
                onClick={(e) => {
                  switchLanguage("es", e);
                  setIsOpen(false);
                }}
                className="pt-5 py-2 pr-4 pl-3 text-gray-700 hover:text-blue-600 
                           dark:text-gray-400 dark:hover:text-blue-400 transition duration-200"
              >
                Es
              </button>
            </li>

            {/* Íconos sociales en móvil */}
            <li className="md:ml-4">
              <SocialIcons className="flex md:hidden justify-center mt-4" />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
