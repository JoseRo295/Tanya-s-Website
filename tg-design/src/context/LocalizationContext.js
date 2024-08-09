// src/context/LocalizationContext.js
import React, { createContext, useContext, useState } from 'react';

const LocalizationContext = createContext();

export const useLocalization = () => useContext(LocalizationContext);

const translations = {
    en: {
        home: "Home",
        about: "About",
        services: "Services",
        pricing: "Pricing",
        contact: "Contact"
    },
    ru: {
        home: "Главная",
        about: "О нас",
        services: "Услуги",
        pricing: "Цены",
        contact: "Контакт"
    },
    es: {
        home: "Inicio",
        about: "Acerca de",
        services: "Servicios",
        pricing: "Precios",
        contact: "Contacto"
    }
};

export const LocalizationProvider = ({ children }) => {
    const [language, setLanguage] = useState('en');

    const translate = (key) => translations[language][key] || key;

    const switchLanguage = (lang) => setLanguage(lang);

    return (
        <LocalizationContext.Provider value={{ translate, switchLanguage }}>
            {children}
        </LocalizationContext.Provider>
    );
};
