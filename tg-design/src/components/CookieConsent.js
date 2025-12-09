import React, { useState, useEffect } from 'react';
import { useLocalization } from '../context/LocalizationContext';

const CookieConsent = () => {
  const { translate } = useLocalization();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Comprobar si el usuario ya ha dado su consentimiento
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      // Mostrar el banner después de un pequeño retraso para una mejor UX
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true');
    setIsVisible(false);
    // Aquí podrías disparar eventos de activación de analytics si fuera necesario controlarlo manualmente
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'false');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-8 md:right-auto md:max-w-md z-[9999] bg-white/90 backdrop-blur-md border border-gray-100 shadow-2xl rounded-2xl p-6 animate-fade-in-up">
      <div className="flex flex-col gap-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">
            {translate('cookieTitle')} 🍪
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            {translate('cookieText')}{' '}
            <a href="/privacy-policy" className="text-[#FF5A5F] hover:underline font-medium">
              {translate('cookiePolicyLink')}
            </a>.
          </p>
        </div>
        
        <div className="flex gap-3 mt-2">
          <button
            onClick={handleAccept}
            className="flex-1 px-4 py-2 bg-[#FF5A5F] hover:bg-[#ff4449] text-white text-sm font-bold rounded-lg transition-colors shadow-md hover:shadow-lg"
          >
            {translate('cookieAccept')}
          </button>
          <button
            onClick={handleDecline}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold rounded-lg transition-colors"
          >
            {translate('cookieDecline')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
