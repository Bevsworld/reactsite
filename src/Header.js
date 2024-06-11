import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  width: 100%;
  padding: 8px;
  background-color: white;
    padding-left: 25px;
  display: flex;
  justify-content: left;
  align-items: center;
  border-bottom: 1px solid #e0e0e0; /* Add bottom border */
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
