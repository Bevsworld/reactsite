import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  width: 100%;
    height: 20px;
  padding: 20px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #e0e0e0; /* Add bottom border */
    margin-bottom: 100px;
`;

const Logo = styled.h1`
  font-size: 1.2em;
  color: black;
  font-family: 'Quicksand', sans-serif;
`;

const Header = () => (
  <HeaderContainer>
    <Logo>samladpolitik</Logo>
  </HeaderContainer>
);

export default Header;
