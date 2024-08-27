import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  width: 15em;
  height: 3em;
  border-radius: 30em;
  font-size: 15px;
  border: none;
  position: relative;
  overflow: hidden;
  color: #212024; 
 
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
  const handleClick = () => {
    const phoneNumber = '+593987149330'; 
    const url = `https://wa.me/${phoneNumber}`;
    window.open(url, '_blank');
  };

  return (
    <div>
      <Button onClick={handleClick}>
      Elige este paquete
      </Button>
    </div>
  );
};

export default Home;
