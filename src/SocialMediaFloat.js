import React from 'react';
import styled from 'styled-components';
import twitterLogo from './twitter-logo.png';
import instagramLogo from './instagram-img.png';

const ToggleContainer = styled.div`
    display: flex;
    background-color: white;
    border-radius: 50px;
    padding: 5px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    margin-bottom: 10px;
    justify-content: center;
`;

const Icon = styled.img`
    width: 30px;
    height: 30px;
    cursor: pointer;
    opacity: ${props => props.active ? '1' : '0.55'};
    transition: opacity 0.3s ease;
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
