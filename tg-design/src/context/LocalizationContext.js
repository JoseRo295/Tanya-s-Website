// src/context/LocalizationContext.js
import React, { createContext, useContext, useState } from "react";

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
    helpText:
      "We are here to assist you with any questions or inquiries you might have.",
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
    proyecto1: "Studio, 25 m², Saint Petersburg",
    descripcionProyecto1:
      "A vibrant studio with accent wallpaper, a concrete wall, and a neutral bathroom featuring black accents in plumbing and lighting.",

      proyecto2: "One-bedroom apartment, 35 m², St. Petersburg",
      descripcionProyecto2: "A one-bedroom apartment for a female lawyer, with a light color palette, vibrant blue accents, and the use of dark wood. A concrete accent wall in the bedroom highlights the character of the apartment."
    ,      
    proyecto3: "One-bedroom apartment, 43 m², Nizhny Novgorod",
descripcionProyecto3: "A bright apartment for a young woman, in gray tones.",

proyecto4: "Two-bedroom apartment, 64 m², Novosibirsk",
descripcionProyecto4: "A stylish two-bedroom apartment for a young couple with a small child, designed in a vibrant combination of pink and turquoise.",

proyecto5: "Office, 15 m², Kstovo",
descripcionProyecto5: "An office designed for a young gamer who enjoys fresh shades of green, light wood, and minimalist aesthetics.",

proyecto6: "Two-room apartment, 54 m², Nizhny Novgorod",
descripcionProyecto6: "A cozy two-room apartment for a mother and her teenage daughter, as well as two cats and a small dog. Designed in soft shades of blue and beige with gold accents. The apartment features plenty of storage space, and even a cat scratcher is seamlessly integrated into the interior.",


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
    visualizaciones3D:
      "3D visualizations of the selected concept (3-10 renders per room)",
    rendersMueblesPersonalizados: "Custom furniture renders",
    visitasSitio: "3 site visits during the renovation process",
    panoramica360: "360° panorama for each room",
    compraMuebles: "Purchase of furniture, decor",
    controlEntregas: "Delivery control and acceptance of furniture",
    consultaTiempo: "30 minutes / 1 hour",
    respuestasPreguntas: "Answers to your interior design questions",
    materialesFinales: "Final materials after the consultation",

    projectTeam: "Project Team",
    teamDescription:
      "Hello! I’m Tatiana Gorshkova, an interior designer with experience working on projects in Russia and Ecuador. I am fluent in English, Russian, and Spanish, which allows me to easily connect with clients around the world. My portfolio features a range of styles, from refined neoclassicism to bold lofts. However, my primary focus is the uniqueness of each project. I love to bring unconventional and creative solutions to life, paying attention to every detail to ensure the interior not only reflects the client’s individuality but also creates a sense of comfort and aesthetic pleasure.",
    tatianaName: "Tatiana Gorshkova",
    projectLead: "Project Lead",
    downloadBrochure: "Download package example",

    conceptItems: [
      "Furniture layout plan (1–2 options)",
      "Mood board with furniture and materials",
      "Shopping list (furniture, materials)",
      "Online consultation for implementation",
    ],
    result100Items: [
      "Furniture layout plan (2–3 options)",
      "Mood board with furniture and materials",
      "3D visualization",
      "Complete set of drawings for builders",
      "Shopping list",
      "Online support during implementation",
    ],
    wowEffectItems: [
      "Everything from the '100% Result' package",
      "Interior panoramas and videos",
      "Online/offline shopping trips together",
      "Purchase of materials and furniture",
      "Site visits and implementation control",
    ],
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
    proyecto1: "Студия, 25 м², г. Санкт-Петербург",
    descripcionProyecto1:
      "Яркая студия с акцентными обоями, бетонной стеной и нейтральной ванной с черными акцентами в сантехнике и освещении.",

      proyecto2: "Однокомнатная квартира, 35 м², г. Санкт-Петербург",
      descripcionProyecto2: "Однокомнатная квартира для девушки-юриста в светлой цветовой гамме с яркими синими акцентами, использованием темного дерева. Акцентная бетонная стена в спальне показывает характер квартиры.",

      
      proyecto3: "Однокомнатная квартира, 43 м², г. Нижний Новгород",
      descripcionProyecto3: "Светлая квартира для молодой девушки в серых тонах.",
      
      proyecto4: "Двухкомнатная квартира, 64 м², г. Новосибирск",
      descripcionProyecto4: "Стильная двухкомнатная квартира для молодой пары с маленьким ребенком, выполненная в ярком цветовом решении сочетания розового и бирюзового.",
      
      proyecto5: "Кабинет, 15 м², г. Кстово",
      descripcionProyecto5: "Кабинет для молодого человека-геймера, которому нравятся свежие оттенки зеленого, светлого дерева и эстетика минимализма.",
      
      proyecto6: "Двухкомнатная квартира, 54 м², г. Нижний Новгород",
      descripcionProyecto6: "Уютная двухкомнатная квартира для мамы и дочки-подростка, а также 2 кошек и собачки, выполненная в нежных голубых, бежевых оттенках с золотыми акцентами. В квартире предусмотрено много мест хранения, и даже когтеточка вписана в интерьер.",
      

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
    visualizaciones3D:
      "3D-визуализации выбранной концепции (3-10 рендеров на комнату)",
    rendersMueblesPersonalizados: "Рендеры мебели на заказ",
    visitasSitio: "3 визита на объект во время ремонта",
    panoramica360: "Панорамный вид на 360° для каждой комнаты",
    compraMuebles: "Покупка мебели, декора",
    controlEntregas: "Контроль и приемка доставок мебели",
    consultaTiempo: "30 минут / 1 час",
    respuestasPreguntas: "Ответы на ваши вопросы по дизайну интерьера",
    materialesFinales: "Итоговые материалы после консультации",

    projectTeam: "Проектная команда",
    teamDescription:
      "Привет! Я Татьяна Горшкова, дизайнер интерьера, с опытом работы над проектами в России и Эквадоре. Свободно владею английским, русским и испанским, что позволяет мне легко находить общий язык с клиентами по всему миру. В моем портфолио вы найдете разнообразие стилей — от утонченной неоклассики до смелого лофта. Однако для меня главным остается уникальность каждого проекта. Я люблю воплощать нестандартные и креативные решения, уделяя внимание каждой детали, чтобы интерьер не только подчеркивал индивидуальность клиента, но и создавал атмосферу уюта и эстетического удовольствия.",
    tatianaName: "Татьяна Горшкова",
    projectLead: "Руководитель проекта",
    downloadBrochure: "Скачать пример пакета",

    conceptItems: [
      "План расстановки мебели (1–2 варианта)",
      "Коллаж с примерами мебели и материалов",
      "Шопинг-лист (мебель, материалы)",
      "Онлайн-консультация по реализации",
    ],
    result100Items: [
      "План расстановки мебели (2–3 варианта)",
      "Коллаж с примерами мебели и материалов",
      "3D-визуализация",
      "Полный комплект чертежей для строителей",
      "Шопинг-лист",
      "Онлайн сопровождение реализации",
    ],
    wowEffectItems: [
      "Всё из пакета '100% результат'",
      "Панорамы и видео вашего интерьера",
      "Онлайн/офлайн поход в магазины вместе",
      "Закупка материалов и мебели",
      "Выезды на стройку, контроль реализации",
    ],
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
    helpText:
      "Estamos aquí para ayudarte con cualquier pregunta o consulta que tengas.",
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
    proyecto1: "Estudio, 25 m², San Petersburgo",
    descripcionProyecto1:
      "Un estudio vibrante con papel tapiz llamativo, una pared de hormigón y un baño neutro con acentos negros en la grifería e iluminación.",

      proyecto2: "Apartamento de una habitación, 35 m², San Petersburgo",
      descripcionProyecto2: "Un apartamento de una habitación para una abogada, con una paleta de colores claros y acentos azules vibrantes, además del uso de madera oscura. Una pared de hormigón en la habitación resalta el carácter del apartamento.",
      
      proyecto3: "Apartamento de una habitación, 43 m², Nizhni Nóvgorod",
      descripcionProyecto3: "Un apartamento luminoso para una joven, en tonos grises.",
      
      proyecto4: "Apartamento de dos habitaciones, 64 m², Novosibirsk",
      descripcionProyecto4: "Un apartamento elegante de dos habitaciones para una pareja joven con un niño pequeño, diseñado en una combinación vibrante de rosa y turquesa.",
      
      proyecto5: "Estudio, 15 m², Kstovo",
      descripcionProyecto5: "Un estudio diseñado para un joven gamer que disfruta de los tonos frescos de verde, la madera clara y la estética minimalista.",
      
      proyecto6: "Apartamento de 2 habitaciones, 54 m², Nizhni Nóvgorod",
      descripcionProyecto6: "Un acogedor apartamento de dos habitaciones para una madre y su hija adolescente, además de dos gatos y un perrito. Decorado en tonos suaves de azul y beige con acentos dorados. El diseño incluye múltiples espacios de almacenamiento e incluso un rascador integrado en el interior.",
      
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
    visualizaciones3D:
      "Visualizaciones 3D del concepto seleccionado (3-10 renders para cada habitación)",
    rendersMueblesPersonalizados: "Renders de muebles personalizados",
    visitasSitio: "3 visitas al sitio durante el proceso de renovación",
    panoramica360: "Panorámica 360 de cada habitación",
    compraMuebles: "Compra de muebles, decoración",
    controlEntregas: "Control y aceptación de entregas de muebles",
    consultaTiempo: "30 minutos/1 hora",
    respuestasPreguntas: "Respuestas a tus preguntas sobre tu diseño interior",
    materialesFinales: "Materiales finales después de la consulta",

    projectTeam: "Equipo de Proyecto",
    teamDescription:
      "¡Hola! Soy Tatiana Gorshkova, diseñadora de interiores con experiencia trabajando en proyectos en Rusia y Ecuador. Hablo inglés, ruso y español con fluidez, lo que me permite conectar fácilmente con clientes de todo el mundo. Mi portafolio incluye una variedad de estilos, desde el refinado neoclásico hasta el loft atrevido. Sin embargo, mi enfoque principal es la singularidad de cada proyecto. Me encanta dar vida a soluciones no convencionales y creativas, prestando atención a cada detalle para asegurar que el interior no solo refleje la individualidad del cliente, sino que también cree una sensación de comodidad y placer estético.",
    tatianaName: "Tatiana Gorshkova",
    projectLead: "Líder del Proyecto",
    downloadBrochure: "Descargar ejemplo del paquete",

    conceptItems: [
      "Plano de distribución de muebles (1–2 opciones)",
      "Collage con ejemplos de muebles y materiales",
      "Lista de compras (muebles, materiales)",
      "Consulta online para la implementación",
    ],
    result100Items: [
      "Plano de distribución de muebles (2–3 opciones)",
      "Collage con ejemplos de muebles y materiales",
      "Visualización en 3D",
      "Conjunto completo de planos para los constructores/albañiles",
      "Lista de compras",
      "Soporte online durante la implementación",
    ],
    wowEffectItems: [
      "Todo lo del paquete '100% Resultado'",
      "Panoramas y videos del interior",
      "Visitas online/presenciales a tiendas juntos",
      "Compra de materiales y muebles",
      "Visitas a la obra y control de implementación",
    ],
  },
};

export const LocalizationProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");

  const translate = (key) => translations[language][key] || key;

  const switchLanguage = (lang, event) => {
    event.preventDefault(); // Previene el comportamiento predeterminado del enlace
    setLanguage(lang);
  };

  return (
    <LocalizationContext.Provider value={{ translate, switchLanguage }}>
      {children}
    </LocalizationContext.Provider>
  );
};
