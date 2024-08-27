import React, { useState } from 'react';
import { useLocalization } from "../context/LocalizationContext";
import logo from "../Images/tgDesign.jpg";
import SocialIcons from "../components/SocialIcons.js";

const Header = () => {
    // Estado para controlar la visibilidad del menú en dispositivos móviles
    const [isOpen, setIsOpen] = useState(false);
    const { translate, switchLanguage } = useLocalization();

    return (
        <nav className="bg-white border-b border-gray-200 dark:border-gray-700 px-4 py-3 shadow-md dark:bg-gray-800">
            <div className="container flex flex-wrap justify-between items-center mx-auto">
                <a href="/" className="flex items-center">
                    <img src={logo} alt="Logotipo" className="h-16 w-auto mr-3 rounded-lg shadow-lg" />
                    <span className="text-2xl font-semibold text-gray-900 dark:text-white">TG Design</span>
                </a>
                <div className="flex items-center">
                
                    <button 
                        id="menu-toggle"
                        type="button"
                        className="inline-flex items-center p-2 text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button>
                </div>

                <div className={`${isOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`}>
                    <ul className="flex flex-col md:flex-row md:space-x-8 mt-4 md:mt-0 text-lg font-medium ">
                        
                        <li>
                            <a href="/" className="block  pt-5 py-2 pr-4 pl-3 text-gray-900 hover:text-blue-600 dark:text-white dark:hover:text-blue-400 transition duration-200">{translate('home')}</a>
                        </li>
                        <li>
                            <a href="/projectCarousel" className="block  pt-5 py-2 pr-4 pl-3 text-gray-900 hover:text-blue-600 dark:text-white dark:hover:text-blue-400 transition duration-200">{translate('proyectos')}</a>
                        </li>
                        <li>
                            <a href="/services" className="block pt-5 py-2 pr-4 pl-3 text-gray-900 hover:text-blue-600 dark:text-white dark:hover:text-blue-400 transition duration-200">{translate('services')}</a>
                        </li>
                       
                        <li>
                            <a href="/contact" className="block pt-5 py-2 pr-4 pl-3 text-gray-900 hover:text-blue-600 dark:text-white dark:hover:text-blue-400 transition duration-200">{translate('contacts')}</a>
                        </li>
                        
                        <li className="md:ml-4">
                            <a href="#" className="block  pt-5 py-2 pr-4 pl-3 text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition duration-200" onClick={() => switchLanguage('ru')}>Ru</a>
                        </li>
                        <li>
                            <a href="#" className="block  pt-5 py-2 pr-4 pl-3 text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition duration-200" onClick={() => switchLanguage('en')}>En</a>
                        </li>
                        <li>
                            <a href="#" className="block  pt-5 py-2 pr-4 pl-3 text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition duration-200" onClick={() => switchLanguage('es')}>Es</a>
                        </li>
                        <li className="md:ml-4">
                        <SocialIcons className="flex md:hidden justify-center mt-4" /> {/* Visible en dispositivos móviles */}
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Header;
