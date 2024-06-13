import React from 'react';
import styled from 'styled-components';
import twitterLogo from './twitter-logo.png';
import instagramLogo from './instagram-img.png';

const ToggleContainer = styled.div`
    display: flex;
    background-color: #ffffff;
    border-radius: 30px;
    padding: 5px;
    width: 105px;
    justify-content: space-around;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    margin: 10px auto;

    @media (min-width: 768px) {
        display: none;  // Hide on screens wider than 768px
    }
`;

const Icon = styled.img`
    width: 20px;
    height: 20px;
    cursor: pointer;
    transition: transform 0.3s ease;
    transform: scale(${props => props.active ? 1.2 : 1});
    opacity: ${props => props.active ? 1 : 0.5};
`;

const SocialMediaToggle = ({ active, onToggle }) => {
    return (
        <ToggleContainer>
            <Icon
                src={twitterLogo}
                alt="Twitter"
                active={active === 'twitter'}
                onClick={() => onToggle('twitter')}
            />
            <Icon
                src={instagramLogo}
                alt="Instagram"
                active={active === 'instagram'}
                onClick={() => onToggle('instagram')}
            />
        </ToggleContainer>
    );
};

export default SocialMediaToggle;