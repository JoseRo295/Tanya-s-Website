// src/context/LocalizationContext.js
import React, { createContext, useContext, useState } from 'react';

const LocalizationContext = createContext();

export const useLocalization = () => useContext(LocalizationContext);

const translations = {
    en: {
        home: "Home",
        proyectos: "Projects",
        services: "Services",
        pricing: "Pricing",
        contacts: "Contacts"
    },
    ru: {
        home: "Главная",
        proyectos: "Проекты",
        services: "Услуги",
        pricing: "Цены",
        contacts: "Контакты"
    },
    es: {
        home: "Inicio",
        proyectos: "Proyectos",
        services: "Servicios",
        pricing: "Precios",
        contacts: "Contactos"
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
