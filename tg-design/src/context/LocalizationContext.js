// src/context/LocalizationContext.js
import React, { createContext, useContext, useState } from "react";

const LocalizationContext = createContext();

export const useLocalization = () => useContext(LocalizationContext);

const translations = {
  en: {
    home: "Home",
    aboutMe: "About Me",
    proyectos: "Projects",
    services: "Services",
    pricing: "Pricing",
    contacts: "Contacts",
    choosePackage: "Choose this package",
    contactUs: "Contact Me",
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

    nuestrosProyectos: "Projects",
    proyecto1: "Studio, 25 m², Saint Petersburg",
    descripcionProyecto1:
      "A vibrant studio with accent wallpaper, a concrete wall, and a neutral bathroom featuring black accents in plumbing and lighting.",

    proyecto2: "One-bedroom apartment, 35 m², St. Petersburg",
    descripcionProyecto2:
      "A one-bedroom apartment for a female lawyer, with a light color palette, vibrant blue accents, and the use of dark wood. A concrete accent wall in the bedroom highlights the character of the apartment.",
    proyecto3: "One-bedroom apartment, 43 m², Nizhny Novgorod",
    descripcionProyecto3:
      "A bright apartment for a young woman, in gray tones.",

    proyecto4: "Two-bedroom apartment, 64 m², Novosibirsk",
    descripcionProyecto4:
      "A stylish two-bedroom apartment for a young couple with a small child, designed in a vibrant combination of pink and turquoise.",

    proyecto5: "Office, 15 m², Kstovo",
    descripcionProyecto5:
      "An office designed for a young gamer who enjoys fresh shades of green, light wood, and minimalist aesthetics.",

    proyecto6: "Two-room apartment, 54 m², Nizhny Novgorod",
    descripcionProyecto6:
      "A cozy two-room apartment for a mother and her teenage daughter, as well as two cats and a small dog. Designed in soft shades of blue and beige with gold accents. The apartment features plenty of storage space, and even a cat scratcher is seamlessly integrated into the interior.",

    proyecto7: "Family Apartment, 80 m², Nizhny Novgorod",
    descripcionProyecto7:
      "A cozy three-room family apartment with a spacious kitchen-living room, a bedroom with a thoughtfully designed walk-in closet, a study, a children's room, and two separate bathrooms. The apartment is designed in a modern style with bright emerald accents in the textiles.",

    proyecto8: "Three-Bedroom Apartment, 65 m², Moscow",
    descripcionProyecto8:
      "A three-bedroom apartment that considers the wishes of each family member. The modern style and neutral color palette unify all spaces, creating a cohesive concept.",

    proyecto9: "One-room apartment, 37m², Nizhny Novgorod",
    descripcionProyecto9:
      "Cozy one-room apartment in an industrial style with elements of minimalism, designed in a neutral color palette with black accents and a pleasant olive tone that adds dynamism to the interior.",

    proyecto10: "Three-room apartment, Quito, Ecuador",
    descripcionProyecto10:
      "As part of this project, furniture was designed for the entryway, living room, and children's room. Additionally, decor, wallpaper, paint color, and lighting fixtures were selected to harmoniously match the existing furniture and finishes.",

    airbnbOfferTitle: "Do you need a project for an Airbnb apartment?",
    airbnbOfferText: "We have a special offer for you!",
    whatsappButton: "Write on WhatsApp",

    airbnbOffer: "Airbnb Offer",

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
    designerSpaceTitle: [
      "The design of your dreams is closer than you think...",
    ],
    orderDesignProject: ["Order a design project"],
    closeButton: "Close",

    privacyPolicyTitle: "Privacy Policy",
    privacyPolicyText:
      "At TG-Design, we are committed to protecting and respecting your privacy. This Privacy Policy explains how we collect, use, and protect the personal information you provide through our website and other related services.",
    infoWeCollect: "1. Information We Collect",
    infoWeCollectText:
      "We collect personal information that you provide directly, such as your name, email address, phone number, and any other information you choose to share with us.",
    useOfInfo: "2. Use of Information",
    useOfInfoList: [
      "Provide and improve our services.",
      "Communicate with you and respond to your inquiries.",
      "Fulfill our legal obligations.",
      "Analyze the use of our website and improve its functionality.",
    ],
    shareInfo: "3. Sharing Information",
    shareInfoText:
      "We do not share your personal information with third parties, except when necessary to comply with our legal obligations, protect our rights, or as part of a business agreement (such as service providers assisting us in our operations).",
    protectInfo: "4. Protection of Information",
    protectInfoText:
      "We implement technical and organizational security measures to protect your personal information against unauthorized access, loss, or misuse. However, please note that no data transmission over the internet is completely secure.",
    yourRights: "5. Your Rights",
    yourRightsText:
      "You have the right to access, rectify, or delete your personal information. You can also object to the processing of your data or request the portability of it. To exercise these rights, please contact us at +593983548611.",
    privacyChanges: "6. Changes to the Privacy Policy",
    privacyChangesText:
      "We may update this Privacy Policy. We will notify you of any changes by posting the new policy on our website. We recommend reviewing this page periodically to stay informed of any changes.",
    contact: "7. Contact",
    contactText:
      "If you have any questions regarding this Privacy Policy or how we handle your personal information, you can contact us at +593983548611.",

    detailsButton: "More details",

    // Package "Concept"
    conceptPackageTitle: 'Package "Concept"',
    conceptPackageSubtitle:
      "For those needing a design with essential planning",
    conceptPackagePrice: "from 18 $/m2",
    conceptPackageTime: "2-3 weeks",
    conceptPackageItems: [
      "Furniture layout plan (1–2 options)",
      "Mood board with furniture and materials",
      "Shopping list (furniture, materials)",
      "Online consultation for implementation (1 call)",
    ],

    // Package "100%"
    hundredPackageTitle: 'Package "100%"',
    hundredPackageSubtitle:
      "For those needing a full design package with drawings",
    hundredPackagePrice: "from 25 $/m2",
    hundredPackageTime: "6 weeks",
    hundredPackageItems: [
      "Furniture layout plan (2–3 options)",
      "Mood board with furniture and materials",
      "3D visualization",
      "Complete set of drawings for builders",
      "Shopping list (furniture, materials)",
      "Online consultation for implementation (1 call)",
    ],

    // Package "Airbnb"
    airbnbPackageTitle: 'Package "Airbnb" (apartments up to 40 m2)',
    airbnbPackageSubtitle: "For those preparing a property for rent",
    airbnbPackagePrice: "from 27 $/m2",
    airbnbPackageTime: "5 weeks + renovation time",
    airbnbPackageItems: [
      "Furniture layout plan (2–3 options)",
      "Mood board with furniture and materials",
      "3D visualization",
      "Complete set of drawings for builders",
      "Shopping list (furniture, materials)",
      "Organization of purchase of materials, furniture, decor, necessary things (from towels to soap)",
      "Online/offline shopping trips together",
      "Site visits and implementation control (only in Ecuador)",
      "Apartment Decoration",
      "Photoshoot of an apartment for posting on a website",
    ],

    // Package "WOW Effect"
    wowPackageTitle: 'Package "WOW Effect"',
    wowPackageSubtitle:
      "For those who want to entrust the complete process to professionals",
    wowPackagePrice: "from 40 $/m2",
    wowPackageTime: "6 weeks + renovation time",
    wowPackageItems: [
      "Furniture layout plan (2–3 options)",
      "Mood board with furniture and materials",
      "3D visualization",
      "Complete set of drawings for builders",
      "Shopping list (furniture, materials)",
      "Online unlimited support during implementation",
      "Interior panoramas and videos",
      "Online/offline shopping trips together",
      "Purchase of materials and furniture",
      "Site visits and implementation control (only in Ecuador)",
    ],
    firstNameRequired: "This field is required",
    lastNameRequired: "This field is required",
    emailRequired: "Please enter your email",
    countryRequired: "Please select a country",
    phoneNumberRequired: "Please enter your phone number",
    agreeRequired: "You must agree to the terms",
  },
  ru: {
    home: "Главная",
    aboutMe: "Обо мне",
    proyectos: "Проекты",
    services: "Услуги",
    pricing: "Цены",
    contacts: "Контакты",
    choosePackage: "Выберите этот пакет",
    contactUs: "Связаться со мной",
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

    nuestrosProyectos: "Проекты",
    proyecto1: "Студия, 25 м², г. Санкт-Петербург",
    descripcionProyecto1:
      "Яркая студия с акцентными обоями, бетонной стеной и нейтральной ванной с черными акцентами в сантехнике и освещении.",

    proyecto2: "Однокомнатная квартира, 35 м², г. Санкт-Петербург",
    descripcionProyecto2:
      "Однокомнатная квартира для девушки-юриста в светлой цветовой гамме с яркими синими акцентами, использованием темного дерева. Акцентная бетонная стена в спальне показывает характер квартиры.",

    proyecto3: "Однокомнатная квартира, 43 м², г. Нижний Новгород",
    descripcionProyecto3: "Светлая квартира для молодой девушки в серых тонах.",

    proyecto4: "Двухкомнатная квартира, 64 м², г. Новосибирск",
    descripcionProyecto4:
      "Стильная двухкомнатная квартира для молодой пары с маленьким ребенком, выполненная в ярком цветовом решении сочетания розового и бирюзового.",

    proyecto5: "Кабинет, 15 м², г. Кстово",
    descripcionProyecto5:
      "Кабинет для молодого человека-геймера, которому нравятся свежие оттенки зеленого, светлого дерева и эстетика минимализма.",

    proyecto6: "Двухкомнатная квартира, 54 м², г. Нижний Новгород",
    descripcionProyecto6:
      "Уютная двухкомнатная квартира для мамы и дочки-подростка, а также 2 кошек и собачки, выполненная в нежных голубых, бежевых оттенках с золотыми акцентами. В квартире предусмотрено много мест хранения, и даже когтеточка вписана в интерьер.",

    proyecto7: "Семейная квартира, 80 м², г. Нижний Новгород",
    descripcionProyecto7:
      "Семейная трехкомнатная квартира с просторной кухней-гостиной, спальней с продуманной гардеробной, кабинетом, детской и 2 отдельными санузлами. Дизайн квартиры выполнен в современном стиле в яркими изумрудными акцентами в текстиле",

    proyecto8: "Трехкомнатная квартира, 65 м², г. Москва",
    descripcionProyecto8:
      "Трехкомнатная квартира, в которой учтены пожелания каждого члена семьи. Современный стиль и нейтральная цветовая гамма объединяют все помещения, создавая единую концепцию.",

    proyecto9: "Однокомнатная квартира, 37м², г. Нижний Новгород",
    descripcionProyecto9:
      "Уютная однокомнатная квартира в стиле индастриал с элементами минимализма, выполненная в нейтральной цветовой гамме с черными акцентами и приятным оливковым цветом, который добавляет динамики интерьеру.",

    proyecto10: "Трехкомнатная квартира, Кито, Эквадор",
    descripcionProyecto10:
      "В рамках проекта была разработана мебель для прихожей, гостиной и детской комнаты. Также был подобран декор, обои, цвет краски и светильники таким образом, чтобы они гармонично сочетались с уже существующей мебелью и отделкой.",

    airbnbOfferTitle: "Вам нужен проект для квартиры Airbnb?",
    airbnbOfferText: "У нас есть специальное предложение для вас!",
    whatsappButton: "Написать в WhatsApp",

    airbnbOffer: "Предложение Airbnb",

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
    designerSpaceTitle: ["Дизайн вашей мечты – уже рядом..."],
    orderDesignProject: ["Заказать дизайн-проект"],
    closeButton: "Закрыть",

    privacyPolicyTitle: "Политика конфиденциальности",
    privacyPolicyText:
      "В TG-Design мы стремимся защищать и уважать вашу конфиденциальность. Эта политика конфиденциальности объясняет, как мы собираем, используем и защищаем личную информацию, которую вы предоставляете через наш сайт и другие сопутствующие услуги.",
    infoWeCollect: "1. Информация, которую мы собираем",
    infoWeCollectText:
      "Мы собираем личную информацию, которую вы предоставляете напрямую, такую как ваше имя, адрес электронной почты, номер телефона и любую другую информацию, которую вы решите с нами поделиться.",
    useOfInfo: "2. Использование информации",
    useOfInfoList: [
      "Предоставление и улучшение наших услуг.",
      "Общение с вами и ответы на ваши запросы.",
      "Выполнение наших юридических обязательств.",
      "Анализ использования нашего сайта и улучшение его функциональности.",
    ],
    shareInfo: "3. Передача информации",
    shareInfoText:
      "Мы не передаем вашу личную информацию третьим лицам, за исключением случаев, когда это необходимо для выполнения наших юридических обязательств, защиты наших прав или в рамках коммерческого соглашения (например, поставщиков услуг, которые помогают нам в нашей деятельности).",
    protectInfo: "4. Защита информации",
    protectInfoText:
      "Мы внедряем технические и организационные меры безопасности для защиты вашей личной информации от несанкционированного доступа, потери или неправильного использования. Однако, пожалуйста, обратите внимание, что передача данных через интернет не является полностью безопасной.",
    yourRights: "5. Ваши права",
    yourRightsText:
      "Вы имеете право на доступ, исправление или удаление вашей личной информации. Вы также можете возразить против обработки ваших данных или запросить их переносимость. Чтобы воспользоваться этими правами, пожалуйста, свяжитесь с нами по телефону +593983548611.",
    privacyChanges: "6. Изменения в политике конфиденциальности",
    privacyChangesText:
      "Мы можем обновить эту Политику конфиденциальности. Мы уведомим вас о любых изменениях, разместив новую политику на нашем сайте. Мы рекомендуем периодически проверять эту страницу, чтобы быть в курсе изменений.",
    contact: "7. Контакт",
    contactText:
      "Если у вас есть вопросы по этой Политике конфиденциальности или по тому, как мы обрабатываем вашу личную информацию, вы можете связаться с нами по телефону +593983548611.",

    detailsButton: "Подробнее",

    // Package "Concept"
    conceptPackageTitle: "Пакет «Concept»",
    conceptPackageSubtitle:
      "Для тех, кому нужен дизайн с базовым планированием",
    conceptPackagePrice: "от 1450 руб/м2",
    conceptPackageTime: "2-3 недели",
    conceptPackageItems: [
      "План расстановки мебели (1–2 варианта)",
      "Мудборд с мебелью и материалами",
      "Список покупок (мебель, материалы)",
      "Онлайн-консультация по внедрению (1 звонок)",
    ],

    // Package "100%"
    hundredPackageTitle: "Пакет «100%»",
    hundredPackageSubtitle:
      "Для тех, кому нужен полный дизайн-проект с чертежами",
    hundredPackagePrice: "от 2000 руб/м2 ",
    hundredPackageTime: "6 недель",
    hundredPackageItems: [
      "План расстановки мебели (2–3 варианта)",
      "Мудборд с мебелью и материалами",
      "3D-визуализация",
      "Полный комплект чертежей для строителей",
      "Список покупок (мебель, материалы)",
      "Онлайн-консультация по внедрению (1 звонок)",
    ],

    // Package "Airbnb"
    airbnbPackageTitle: "Пакет «Airbnb» (квартиры до 40 м²)",
    airbnbPackageSubtitle: "Для тех, кто готовит недвижимость для аренды",
    airbnbPackagePrice: "от 2150 руб/м2 ",
    airbnbPackageTime: "5 недель + время ремонта",
    airbnbPackageItems: [
      "План расстановки мебели (2–3 варианта)",
      "Мудборд с мебелью и материалами",
      "3D-визуализация",
      "Полный комплект чертежей для строителей",
      "Список покупок (мебель, материалы)",
      "Организация закупки материалов, мебели, декора и необходимых предметов (от полотенец до мыла)",
      "Совместные онлайн/офлайн покупки",
      "Выезды на объект и контроль реализации (только в Эквадоре)",
      "Декорирование квартиры",
      "Фотосессия квартиры для размещения на сайте",
    ],

    // Package "WOW Effect"
    wowPackageTitle: "Пакет «WOW Effect»",
    wowPackageSubtitle:
      "Для тех, кто хочет доверить весь процесс профессионалам",
    wowPackagePrice: "от 3200 руб/м2",
    wowPackageTime: "6 недель + время ремонта",
    wowPackageItems: [
      "План расстановки мебели (2–3 варианта)",
      "Мудборд с мебелью и материалами",
      "3D-визуализация",
      "Полный комплект чертежей для строителей",
      "Список покупок (мебель, материалы)",
      "Неограниченная онлайн-поддержка во время реализации",
      "Панорамы и видео интерьера",
      "Совместные онлайн/офлайн покупки",
      "Закупка материалов и мебели",
      "Выезды на объект и контроль реализации (только в Эквадоре)",
    ],
    firstNameRequired: "Это поле обязательно",
    lastNameRequired: "Это поле обязательно",
    emailRequired: "Пожалуйста, введите ваш email",
    countryRequired: "Выберите страну",
    phoneNumberRequired: "Пожалуйста, введите ваш телефон",
    agreeRequired: "Вы должны согласиться с условиями",
  },
  es: {
    home: "Inicio",
    aboutMe: "Sobre mí",
    proyectos: "Proyectos",
    services: "Servicios",
    pricing: "Precios",
    contacts: "Contactos",
    choosePackage: "Elige este paquete",
    contactUs: "Contáctame",
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

    nuestrosProyectos: "Proyectos",
    proyecto1: "Estudio, 25 m², San Petersburgo",
    descripcionProyecto1:
      "Un estudio vibrante con papel tapiz llamativo, una pared de hormigón y un baño neutro con acentos negros en la grifería e iluminación.",

    proyecto2: "Apartamento de una habitación, 35 m², San Petersburgo",
    descripcionProyecto2:
      "Un apartamento de una habitación para una abogada, con una paleta de colores claros y acentos azules vibrantes, además del uso de madera oscura. Una pared de hormigón en la habitación resalta el carácter del apartamento.",

    proyecto3: "Apartamento de una habitación, 43 m², Nizhni Nóvgorod",
    descripcionProyecto3:
      "Un apartamento luminoso para una joven, en tonos grises.",

    proyecto4: "Apartamento de dos habitaciones, 64 m², Novosibirsk",
    descripcionProyecto4:
      "Un apartamento elegante de dos habitaciones para una pareja joven con un niño pequeño, diseñado en una combinación vibrante de rosa y turquesa.",

    proyecto5: "Estudio, 15 m², Kstovo",
    descripcionProyecto5:
      "Un estudio diseñado para un joven gamer que disfruta de los tonos frescos de verde, la madera clara y la estética minimalista.",

    proyecto6: "Apartamento de 2 habitaciones, 54 m², Nizhni Nóvgorod",
    descripcionProyecto6:
      "Un acogedor apartamento de dos habitaciones para una madre y su hija adolescente, además de dos gatos y un perrito. Decorado en tonos suaves de azul y beige con acentos dorados. El diseño incluye múltiples espacios de almacenamiento e incluso un rascador integrado en el interior.",

    proyecto7: "Apartamento familiar, 80 m², Nizhni Nóvgorod",
    descripcionProyecto7:
      "Acogedor apartamento familiar de tres habitaciones con una amplia cocina-sala de estar, un dormitorio con vestidor bien diseñado, un estudio, una habitación infantil y dos baños independientes. El diseño del apartamento está realizado en un estilo moderno con acentos esmeralda vibrantes en los textiles.",

    proyecto8: "Apartamento de tres habitaciones, 65 m², Moscú",
    descripcionProyecto8:
      "Un apartamento de tres habitaciones que tiene en cuenta los deseos de cada miembro de la familia. El estilo moderno y la paleta de colores neutros unifican todos los espacios, creando un concepto armonioso.",
    proyecto9: "Apartamento de una habitación, 37m², Nizhni Nóvgorod",
    descripcionProyecto9:
      "Acogedor apartamento de una habitación en estilo industrial con elementos de minimalismo, diseñado en una paleta de colores neutros con acentos en negro y un agradable tono oliva que aporta dinamismo al interior.",

    proyecto10: "Apartamento de tres habitaciones, Quito, Ecuador",
    descripcionProyecto10:
      "En este proyecto se diseñó el mobiliario para la entrada, la sala de estar y la habitación infantil. Además, se seleccionó la decoración, el papel tapiz, el color de la pintura y las luminarias de manera que combinaran armoniosamente con los muebles y acabados existentes",

    airbnbOfferTitle: "¿Necesitas un proyecto para un apartamento Airbnb?",
    airbnbOfferText: "¡Tenemos una oferta especial para ti!",
    whatsappButton: "Escribir en WhatsApp",

    airbnbOffer: "Oferta Airbnb",

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
    designerSpaceTitle: [
      "El diseño de tus sueños está más cerca de lo que piensas...",
    ],
    closeButton: "Cerrar",
    orderDesignProject: ["Ordenar un proyecto de diseño"],
    privacyPolicyTitle: "Política de Privacidad",
    privacyPolicyText:
      "En TG-Design nosotros, estamos comprometidos a proteger y respetar tu privacidad. Esta Política de Privacidad describe cómo recopilamos, usamos y protegemos la información personal que nos proporcionas a través de nuestro sitio web y otros servicios asociados.",
    infoWeCollect: "1. Información que Recopilamos",
    infoWeCollectText:
      "Recopilamos información personal que nos proporcionas directamente, como tu nombre, dirección de correo electrónico, número de teléfono, y cualquier otra información que decidas compartir con nosotros.",
    useOfInfo: "2. Uso de la Información",
    useOfInfoList: [
      "Proveer y mejorar nuestros servicios.",
      "Comunicarnos contigo y responder a tus consultas.",
      "Cumplir con nuestras obligaciones legales.",
      "Analizar el uso de nuestro sitio web y mejorar su funcionalidad.",
    ],
    shareInfo: "3. Compartir la Información",
    shareInfoText:
      "No compartimos tu información personal con terceros, excepto cuando sea necesario para cumplir con nuestras obligaciones legales, proteger nuestros derechos, o como parte de un acuerdo comercial (como proveedores de servicios que nos asisten en nuestras operaciones).",
    protectInfo: "4. Protección de la Información",
    protectInfoText:
      "Implementamos medidas de seguridad técnicas y organizativas para proteger tu información personal contra el acceso no autorizado, la pérdida, o el uso indebido. Sin embargo, ten en cuenta que ninguna transmisión de datos por Internet es completamente segura.",
    yourRights: "5. Tus Derechos",
    yourRightsText:
      "Tienes derecho a acceder, rectificar o eliminar tu información personal. También puedes oponerte al tratamiento de tus datos o solicitar la portabilidad de los mismos. Para ejercer estos derechos, por favor, contáctanos a +593983548611.",
    privacyChanges: "6. Cambios en la Política de Privacidad",
    privacyChangesText:
      "Podemos actualizar esta Política de Privacidad. Te notificaremos de cualquier cambio publicando la nueva política en nuestro sitio web. Te recomendamos revisar esta página periódicamente para estar al tanto de cualquier cambio.",
    contact: "7. Contacto",
    contactText:
      "Si tienes preguntas sobre esta Política de Privacidad o sobre cómo manejamos tu información personal, puedes contactarnos a +593983548611.",

    detailsButton: "Más detalles",

    // Package "Concept"
    conceptPackageTitle: 'Paquete "Concepto"',
    conceptPackageSubtitle:
      "Para quienes necesitan un diseño con planificación esencial",
    conceptPackagePrice: "desde 18 $/m2",
    conceptPackageTime: "2-3 semanas",
    conceptPackageItems: [
      "Plan de distribución de muebles (1–2 opciones)",
      "Mood board con muebles y materiales",
      "Lista de compras (muebles, materiales)",
      "Consulta online para la implementación (1 llamada)",
    ],

    // Package "100%"
    hundredPackageTitle: 'Paquete "100%"',
    hundredPackageSubtitle:
      "Para quienes necesitan un paquete de diseño completo con planos",
    hundredPackagePrice: "desde 25 $/m2",
    hundredPackageTime: "6 semanas",
    hundredPackageItems: [
      "Plan de distribución de muebles (2–3 opciones)",
      "Mood board con muebles y materiales",
      "Visualización 3D",
      "Conjunto completo de planos para los constructores",
      "Lista de compras (muebles, materiales)",
      "Consulta en línea para la implementación (1 llamada)",
    ],

    // Package "Airbnb"
    airbnbPackageTitle: 'Paquete "Airbnb" (apartamentos hasta 40 m2)',
    airbnbPackageSubtitle: "Para quienes preparan una propiedad para alquiler",
    airbnbPackagePrice: "desde 27 $/m2",
    airbnbPackageTime: "5 semanas + tiempo de renovación",
    airbnbPackageItems: [
      "Plan de distribución de muebles (2–3 opciones)",
      "Mood board con muebles y materiales",
      "Visualización 3D",
      "Conjunto completo de planos para los constructores",
      "Lista de compras (muebles, materiales)",
      "Organización de la compra de materiales, muebles, decoración y artículos necesarios (desde toallas hasta jabón)",
      "Compras en línea/presenciales juntos",
      "Visitas al sitio y control de la implementación (solo en Ecuador)",
      "Decoración del apartamento",
      "Sesión de fotos del apartamento para publicarlo en un sitio web",
    ],

    // Package "WOW Effect"
    wowPackageTitle: 'Paquete "WOW Effect"',
    wowPackageSubtitle:
      "Para quienes desean confiar el proceso completo a profesionales",
    wowPackagePrice: "desde 40 $/m2",
    wowPackageTime: "6 semanas + tiempo de renovación",
    wowPackageItems: [
      "Plan de distribución de muebles (2–3 opciones)",
      "Mood board con muebles y materiales",
      "Visualización 3D",
      "Conjunto completo de planos para los constructores",
      "Lista de compras (muebles, materiales)",
      "Soporte en línea ilimitado durante la implementación",
      "Panoramas y videos del interior",
      "Compras en línea/presenciales juntos",
      "Adquisición de materiales y muebles",
      "Visitas al sitio y control de la implementación (solo en Ecuador)",
    ],
    firstNameRequired: "Este campo es obligatorio",
    lastNameRequired: "Este campo es obligatorio",
    emailRequired: "Por favor ingresa tu email",
    countryRequired: "Selecciona un país",
    phoneNumberRequired: "Por favor ingresa tu teléfono",
    agreeRequired: "Debes aceptar los términos",
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
