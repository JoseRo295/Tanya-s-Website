import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocalization } from '../context/LocalizationContext';

const SEO = ({ title, description, image }) => {
  const { language } = useLocalization();

  // Definir metadatos base según el idioma si no se pasan props específicas
  const siteMetadata = {
    es: {
      title: "TG Design | Diseño de Interiores en Ecuador y Rusia",
      description: "Diseño de interiores exclusivo en Quito, Ecuador y Rusia. Transformamos espacios con estilo moderno, neoclásico e industrial. ¡Contáctanos!",
      keywords: "diseño de interiores, decoración, arquitectura, Quito, Ecuador, Rusia, remodelación, Tatiana Gorshkova",
    },
    en: {
      title: "TG Design | Interior Design in Ecuador & Russia",
      description: "Exclusive interior design in Quito, Ecuador, and Russia. We transform spaces with modern, neoclassical, and industrial styles. Contact us!",
      keywords: "interior design, decoration, architecture, Quito, Ecuador, Russia, renovation, Tatiana Gorshkova",
    },
    ru: {
      title: "TG Design | Дизайн интерьера в Эквадоре и России",
      description: "Эксклюзивный дизайн интерьера в Кито, Эквадор и России. Мы преображаем пространства в современном, неоклассическом и индустриальном стилях.",
      keywords: "дизайн интерьера, декор, архитектура, Кито, Эквадор, Россия, ремонт, Татьяна Горшкова",
    }
  };

  const currentMeta = siteMetadata[language] || siteMetadata['es'];
  const finalTitle = title || currentMeta.title;
  const finalDescription = description || currentMeta.description;
  const url = window.location.href;

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={currentMeta.keywords} />
      <html lang={language} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      {image && <meta property="og:image" content={image} />}
      <meta property="og:locale" content={language === 'en' ? 'en_US' : language === 'ru' ? 'ru_RU' : 'es_ES'} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={finalTitle} />
      <meta property="twitter:description" content={finalDescription} />
      {image && <meta property="twitter:image" content={image} />}

      {/* Canonical & Alternates - Crucial for SEO in multi-language */}
      <link rel="canonical" href={url} />
      <link rel="alternate" hreflang="es" href={`${window.location.origin}?lang=es`} />
      <link rel="alternate" hreflang="en" href={`${window.location.origin}?lang=en`} />
      <link rel="alternate" hreflang="ru" href={`${window.location.origin}?lang=ru`} />
    </Helmet>
  );
};

export default SEO;
