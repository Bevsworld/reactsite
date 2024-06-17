import React, { useState } from 'react';
import styled from 'styled-components';
import ContentContainer from './ContentContainer';
import Pagination from './Pagination';  // Import the Pagination component

const AppContainer = styled.div`
    background-color: #fdfdfd;
    color: white;
    display: flex;
    flex-direction: column;
`;

const Header = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  padding-top: 50px;
  position: relative;
  z-index: 1;
`;

const Logo = styled.div`
  font-size: 2em;
  font-weight: bold;
`;

const Title = styled.h1`
  font-size: 2.5em;
  margin: 20px 0;
  text-align: center;
`;

