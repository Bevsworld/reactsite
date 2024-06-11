import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  50% { transform: rotate(180deg); }
  100% { transform: rotate(360deg); }
`;

const changeColors = keyframes`
  0% { border-top-color: #ff5733; }
  25% { border-top-color: #33ff57; }
  50% { border-top-color: #3357ff; }
  75% { border-top-color: #ff33a8; }
  100% { border-top-color: #ff5733; }
`;

const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const SpinnerIcon = styled.div`
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid transparent;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${spin} 1s linear infinite, ${changeColors} 2s linear infinite;
`;

const Spinner = () => (
    <SpinnerWrapper>
        <SpinnerIcon />
    </SpinnerWrapper>
);

export default Spinner;