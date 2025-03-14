import React from 'react';
import styled from 'styled-components';
import { useLocalization } from '../context/LocalizationContext'; // Asegúrate de que la ruta de importación sea correcta

const StyledButton = styled.button`
  width: 15em;
  height: 3em;
  border-radius: 30em;
  font-size: 15px;
  border: none;
  position: relative;
  overflow: hidden;
  color: #ffffff;

  z-index: 1;
  box-shadow: 1px 1px 4px #ffffff,
              -1px -1px 4px #ffffff;

  &::before {
    content: '';
    width: 0em;
    height: 3em;
    border-radius: 30em;
    position: absolute;
    top: 0;
    left: 0;
    background-image: linear-gradient(to right, #ffffff 0%, #a79584 100%);
    transition: .5s ease;
    display: block;
    z-index: -1;
    color:
  }

  &:hover::before {
    width: 15em;
    background-image: linear-gradient(to right, #ffffff 0%, #a79584 100%);
  }
`;

const Button = ({ children, onClick }) => {
  return (
    <StyledButton onClick={onClick}>
      {children}
    </StyledButton>
  );
};

const Home = () => {
  const { translate } = useLocalization(); // Utilizar el hook de localización
  const handleClick = () => {
    const phoneNumber = '+593983548611'; 
    const url = `https://wa.me/${phoneNumber}`;
    window.open(url, '_blank');
  };

  return (
    <div>
      <Button onClick={handleClick}>
        {translate('choosePackage')} 
      </Button>
    </div>
  );
};

export default Home;
