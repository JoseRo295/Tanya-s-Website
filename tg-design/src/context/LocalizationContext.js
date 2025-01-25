// src/context/LocalizationContext.js
import React, { createContext, useContext, useState } from 'react';

const LocalizationContext = createContext();

export const useLocalization = () => useContext(LocalizationContext);

const translations = {
    en: {
        home: "Home",
        teamsection: "Team Section",
        proyectos: "Projects",
        services: "Services",
        pricing: "Pricing",
        contacts: "Contacts",
        choosePackage: "Choose this package",  
        contactUs: "Contact Us",  
        helpText: "We are here to assist you with any questions or inquiries you might have.",
        firstName: "First Name",
        lastName: "Last Name",
        email: "Email",
        country: "Country",
        selectCountry: "Select a Country",
        phoneNumber: "Phone Number",
        yourPhoneNumber: "Your Phone Number",
        agreeToPolicies: "Agree to policies",
        acceptTerms: "By selecting this, you agree to our",
        privacyPolicy: "privacy policy",
        send: "Send ",

        nuestrosProyectos: "Our Projects",
        proyecto1: "Project 1",
        descripcionProyecto1: "Brief description of project 1.",
        proyecto2: "Project 2",
        descripcionProyecto2: "Brief description of project 2.",
        proyecto3: "Project 3",
        descripcionProyecto3: "Brief description of project 3.",
        proyecto4: "Project 4",
        descripcionProyecto4: "Brief description of project 4.",
        proyecto5: "Project 5",
        descripcionProyecto5: "Brief description of project 5.",
        proyecto6: "Project 6",
        descripcionProyecto6: "Brief description of project 6.",

        nuestrosServicios: "Our Services",
        paqueteEsencial: 'Package "Essential"',
        paqueteConcepto: 'Package "Concept"',
        paqueteEfectoWOW: 'Package "WOW Effect"',
        paquete100: 'Package "100%"',
        paqueteDecoracion: 'Package "Decoration"',
        paqueteConsulta: 'Package "Consultation"',
        tomaDeMedidas: "Room measurements (Quito, Tumbaco, Cumbaya)",
        planAmoblamiento: "Furnishing plan (up to 3 options)",
        planosElectricos: "Electrical plans (sockets, switches)",
        planosLuz: "Lighting plans",
        moodboards: "Moodboards",
        collagesConceptuales: "Conceptual collages for each room",
        plantaBaja: "Ground floor",
        planTecho: "Ceiling plan",
        shoppingList: "Shopping list",
        visualizaciones3D: "3D visualizations of the selected concept (3-10 renders per room)",
        rendersMueblesPersonalizados: "Custom furniture renders",
        visitasSitio: "3 site visits during the renovation process",
        panoramica360: "360° panorama for each room",
        compraMuebles: "Purchase of furniture, decor",
        controlEntregas: "Delivery control and acceptance of furniture",
        consultaTiempo: "30 minutes / 1 hour",
        respuestasPreguntas: "Answers to your interior design questions",
        materialesFinales: "Final materials after the consultation",

        projectTeam: "Project Team",
        teamDescription: "Hello! I’m Tatiana Gorshkova, an interior designer with experience working on projects in Russia and Ecuador. I am fluent in English, Russian, and Spanish, which allows me to easily connect with clients around the world. My portfolio features a range of styles, from refined neoclassicism to bold lofts. However, my primary focus is the uniqueness of each project. I love to bring unconventional and creative solutions to life, paying attention to every detail to ensure the interior not only reflects the client’s individuality but also creates a sense of comfort and aesthetic pleasure.",
        tatianaName: "Tatiana Gorshkova",
        projectLead: "Project Lead",
        downloadBrochure: "Download package example",
        
        
        
        conceptItems: [
            "Furniture layout plan (1–2 options)",
            "Mood board with furniture and materials",
            "Shopping list (furniture, materials)",
            "Online consultation for implementation"
        ],
        result100Items: [
            "Furniture layout plan (2–3 options)",
            "Mood board with furniture and materials",
            "3D visualization",
            "Complete set of drawings for builders",
            "Shopping list",
            "Online support during implementation"
        ],
        wowEffectItems: [
            "Everything from the '100% Result' package",
            "Interior panoramas and videos",
            "Online/offline shopping trips together",
            "Purchase of materials and furniture",
            "Site visits and implementation control"
        ]

    },
    ru: {
        home: "Главная",
        teamsection: "Команда проекта",
        proyectos: "Проекты",
        services: "Услуги",
        pricing: "Цены",
        contacts: "Контакты",
        choosePackage: "Выберите этот пакет",
        contactUs: "Связаться с Нами",
        helpText: "Мы здесь, чтобы помочь вам с любыми вопросами или запросами.",
        firstName: "Имя",
        lastName: "Фамилия",
        email: "Электронная почта",  
        country: "Страна", 
        selectCountry: "Выберите страну",
        phoneNumber: "Номер телефона",
        yourPhoneNumber: "Ваш номер телефона",
        agreeToPolicies: "Согласиться с политикой",
        acceptTerms: "Выбирая это, вы соглашаетесь с нашей",
        privacyPolicy: "политикой конфиденциальности",
        send: "Отправить",

        nuestrosProyectos: "Наши проекты",
        proyecto1: "Проект 1",
        descripcionProyecto1: "Краткое описание проекта 1.",
        proyecto2: "Проект 2",
        descripcionProyecto2: "Краткое описание проекта 2.",
        proyecto3: "Проект 3",
        descripcionProyecto3: "Краткое описание проекта 3.",
        proyecto4: "Проект 4",
        descripcionProyecto4: "Краткое описание проекта 4.",
        proyecto5: "Проект 5",
        descripcionProyecto5: "Краткое описание проекта 5.",
        proyecto6: "Проект 6",
        descripcionProyecto6: "Краткое описание проекта 6.",

        nuestrosServicios: "Наши услуги",
        paqueteEsencial: 'Пакет "Основной"',
        paqueteConcepto: 'Пакет "Концепт"',
        paqueteEfectoWOW: 'Пакет "Вау-эффект"',
        paquete100: 'Пакет "100%"',
        paqueteDecoracion: 'Пакет "Декорирование"',
        paqueteConsulta: 'Пакет "Консультация"',
        tomaDeMedidas: "Замеры комнат (Кито, Тумбао, Кумбая)",
        planAmoblamiento: "План меблировки (до 3 вариантов)",
        planosElectricos: "Электрические схемы (розетки, выключатели)",
        planosLuz: "Планы освещения",
        moodboards: "Мудборды",
        collagesConceptuales: "Концептуальные коллажи для каждой комнаты",
        plantaBaja: "Планировка",
        planTecho: "План потолка",
        shoppingList: "Список покупок",
        visualizaciones3D: "3D-визуализации выбранной концепции (3-10 рендеров на комнату)",
        rendersMueblesPersonalizados: "Рендеры мебели на заказ",
        visitasSitio: "3 визита на объект во время ремонта",
        panoramica360: "Панорамный вид на 360° для каждой комнаты",
        compraMuebles: "Покупка мебели, декора",
        controlEntregas: "Контроль и приемка доставок мебели",
        consultaTiempo: "30 минут / 1 час",
        respuestasPreguntas: "Ответы на ваши вопросы по дизайну интерьера",
        materialesFinales: "Итоговые материалы после консультации",

        projectTeam: "Проектная команда",
        teamDescription: "Привет! Я Татьяна Горшкова, дизайнер интерьера, с опытом работы над проектами в России и Эквадоре. Свободно владею английским, русским и испанским, что позволяет мне легко находить общий язык с клиентами по всему миру. В моем портфолио вы найдете разнообразие стилей — от утонченной неоклассики до смелого лофта. Однако для меня главным остается уникальность каждого проекта. Я люблю воплощать нестандартные и креативные решения, уделяя внимание каждой детали, чтобы интерьер не только подчеркивал индивидуальность клиента, но и создавал атмосферу уюта и эстетического удовольствия.",
        tatianaName: "Татьяна Горшкова",
        projectLead: "Руководитель проекта",
        downloadBrochure: "Скачать пример пакета",

        conceptItems: [
            "План расстановки мебели (1–2 варианта)",
            "Коллаж с примерами мебели и материалов",
            "Шопинг-лист (мебель, материалы)",
            "Онлайн-консультация по реализации"
        ],
        result100Items: [
            "План расстановки мебели (2–3 варианта)",
            "Коллаж с примерами мебели и материалов",
            "3D-визуализация",
            "Полный комплект чертежей для строителей",
            "Шопинг-лист",
            "Онлайн сопровождение реализации"
        ],
        wowEffectItems: [
            "Всё из пакета '100% результат'",
            "Панорамы и видео вашего интерьера",
            "Онлайн/офлайн поход в магазины вместе",
            "Закупка материалов и мебели",
            "Выезды на стройку, контроль реализации"
        ]
         
    },
    es: {
        home: "Inicio",
        teamsection: "Sección del Equipo",
        proyectos: "Proyectos",
        services: "Servicios",
        pricing: "Precios", 
        contacts: "Contactos",
        choosePackage: "Elige este paquete",
        contactUs: "Contáctanos",
        helpText: "Estamos aquí para ayudarte con cualquier pregunta o consulta que tengas.",
        firstName: "Nombre",
        lastName: "Apellido",
        email: "Correo Electrónico",
        country: "País",    
        selectCountry: "Selecciona un País",
        phoneNumber: "Teléfono",
        yourPhoneNumber: "Tu Número de Teléfono",
        agreeToPolicies: "Aceptar políticas",
        acceptTerms: "Al seleccionar esto, aceptas nuestra",
        privacyPolicy: "política de privacidad",
        send: "Enviar",

        nuestrosProyectos: "Nuestros Proyectos",
        proyecto1: "Proyecto 1",
        descripcionProyecto1: "Descripción breve del proyecto 1.",
        proyecto2: "Proyecto 2",
        descripcionProyecto2: "Descripción breve del proyecto 2.",
        proyecto3: "Proyecto 3",
        descripcionProyecto3: "Descripción breve del proyecto 3.",
        proyecto4: "Proyecto 4",
        descripcionProyecto4: "Descripción breve del proyecto 4.",
        proyecto5: "Proyecto 5",
        descripcionProyecto5: "Descripción breve del proyecto 5.",
        proyecto6: "Proyecto 6",
        descripcionProyecto6: "Descripción breve del proyecto 6.",
        nuestrosServicios: "Nuestros Servicios",
        paqueteEsencial: 'Paquete "Esencial"',
        paqueteConcepto: 'Paquete "Concepto"',
        paqueteEfectoWOW: 'Paquete "Efecto WOW"',
        paquete100: 'Paquete "100%"',
        paqueteDecoracion: 'Paquete "Decoración"',
        paqueteConsulta: 'Paquete "Consulta"',
        tomaDeMedidas: "Toma de medidas de habitaciones (Quito, Tumbaco, Cumbaya)",
        planAmoblamiento: "Plan de amoblamiento (hasta 3 opciones)",
        planosElectricos: "Planos eléctricos (enchufes, interruptores)",
        planosLuz: "Planos de luz",
        moodboards: "Moodboards",
        collagesConceptuales: "Collages conceptuales para cada habitación",
        plantaBaja: "Planta baja",
        planTecho: "Plan de techo",
        shoppingList: "Shopping list",
        visualizaciones3D: "Visualizaciones 3D del concepto seleccionado (3-10 renders para cada habitación)",
        rendersMueblesPersonalizados: "Renders de muebles personalizados",
        visitasSitio: "3 visitas al sitio durante el proceso de renovación",
        panoramica360: "Panorámica 360 de cada habitación",
        compraMuebles: "Compra de muebles, decoración",
        controlEntregas: "Control y aceptación de entregas de muebles",
        consultaTiempo: "30 minutos/1 hora",
        respuestasPreguntas: "Respuestas a tus preguntas sobre tu diseño interior",
        materialesFinales: "Materiales finales después de la consulta",

        projectTeam: "Equipo de Proyecto",
        teamDescription: "¡Hola! Soy Tatiana Gorshkova, diseñadora de interiores con experiencia trabajando en proyectos en Rusia y Ecuador. Hablo inglés, ruso y español con fluidez, lo que me permite conectar fácilmente con clientes de todo el mundo. Mi portafolio incluye una variedad de estilos, desde el refinado neoclásico hasta el loft atrevido. Sin embargo, mi enfoque principal es la singularidad de cada proyecto. Me encanta dar vida a soluciones no convencionales y creativas, prestando atención a cada detalle para asegurar que el interior no solo refleje la individualidad del cliente, sino que también cree una sensación de comodidad y placer estético.",
        tatianaName: "Tatiana Gorshkova",
        projectLead: "Líder del Proyecto",
        downloadBrochure: "Descargar ejemplo del paquete",

        conceptItems: [
            "Plano de distribución de muebles (1–2 opciones)",
            "Collage con ejemplos de muebles y materiales",
            "Lista de compras (muebles, materiales)",
            "Consulta online para la implementación"
        ],
        result100Items: [
            "Plano de distribución de muebles (2–3 opciones)",
            "Collage con ejemplos de muebles y materiales",
            "Visualización en 3D",
            "Conjunto completo de planos para los constructores/albañiles",
            "Lista de compras",
            "Soporte online durante la implementación"
        ],
        wowEffectItems: [
            "Todo lo del paquete '100% Resultado'",
            "Panoramas y videos del interior",
            "Visitas online/presenciales a tiendas juntos",
            "Compra de materiales y muebles",
            "Visitas a la obra y control de implementación"
        ]

    }
};

export const LocalizationProvider = ({ children }) => {
    const [language, setLanguage] = useState('en');

    const translate = (key) => translations[language][key] || key;

    const switchLanguage = (lang, event) => {
        event.preventDefault();  // Previene el comportamiento predeterminado del enlace
        setLanguage(lang);
    };

    return (
        <LocalizationContext.Provider value={{ translate, switchLanguage }}>
            {children}
        </LocalizationContext.Provider>
    );
};
