import React from 'react';
import styled, { keyframes } from 'styled-components';

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
`;

const Button = styled.button`
    position: fixed;
    bottom: 20px;
    right: 20px;
    display: ${props => (props.visible ? 'block' : 'none')};
    background: linear-gradient(135deg, #c2cce6, #6f98e8);
    color: white;
    border: none;
    padding: 12px;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    animation: ${bounce} 2s infinite;
    transition: background 0.3s;

    &:hover {
        background: linear-gradient(135deg, #e8f0ff, #cad4f3);
    }

    @media (max-width: 768px) {
        right: 30px;
        bottom: 50px;
    }
`;

const Arrow = styled.div`
    font-size: 18px;
    line-height: 20px;
`;

const ScrollToTopButton = ({ visible, onClick }) => {
    return (
        <Button visible={visible} onClick={onClick}>
            <Arrow>↑</Arrow>
        </Button>
    );
};

export default ScrollToTopButton;
