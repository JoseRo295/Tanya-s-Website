import React, { useState } from 'react';

const WhatsAppButton = () => {
  const [isHovered, setIsHovered] = useState(false);

  const openWhatsApp = () => {
    const phoneNumber = '+593983548611'; // Reemplaza con tu número
    const url = `https://wa.me/${phoneNumber}`;
    window.open(url, '_blank');
  };

  // Estilo del botón (ahora con colores de WhatsApp)
  const buttonStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '60px',
    height: '60px',
    borderRadius: '100%',
    border: 'none',
    // Color base: #25D366 | Hover: #20B855
    backgroundColor: isHovered ? '#20B855' : '#25D366',
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    cursor: 'pointer',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
    transition: 'all 0.3s ease-in-out',
    zIndex: 1000,
  };

  // Estilo del ícono
  const svgStyle = {
    width: '32px',
    height: '32px',
  };

  return (
    <button
      style={buttonStyle}
      onClick={openWhatsApp}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        fill="none"
        style={svgStyle}
      >
        <path
          strokeWidth="2"
          strokeLinecap="round"
          stroke="#fff"
          fillRule="evenodd"
          d="m24.8868 19.1288c-1.0274-.1308-2.036-.3815-3.0052-.7467-.7878-.29-1.6724-.1034-2.276.48-.797.8075-2.0493.9936-2.9664.3258-1.4484-1.055-2.7233-2.3295-3.7783-3.7776-.6681-.9168-.4819-2.1691.3255-2.9659.5728-.6019.7584-1.4748.4802-2.2577-.3987-.98875-.6792-2.02109-.8358-3.07557-.2043-1.03534-1.1138-1.7807-2.1694-1.77778h-3.18289c-.60654-.00074-1.18614.25037-1.60035.69334-.40152.44503-.59539 1.03943-.53345 1.63555.344 3.31056 1.47164 6.49166 3.28961 9.27986 1.64878 2.5904 3.84608 4.7872 6.43688 6.4356 2.7927 1.797 5.9636 2.9227 9.2644 3.289h.1778c.5409.0036 1.0626-.2 1.4581-.569.444-.406.6957-.9806.6935-1.5822v-3.1821c.0429-1.0763-.7171-2.0185-1.7782-2.2046z"
          clipRule="evenodd"
        ></path>
      </svg>
    </button>
  );
};

export default WhatsAppButton;
