import React from 'react';
import styled from 'styled-components';
import twitterLogo from './twitter-logo.png';
import instagramLogo from './instagram-img.png';
import youtubeLogo from './youtube-logo.png';

const ToggleContainer = styled.div`
    display: flex;
    flex-direction: row; /* Display elements in a row */
    height: auto;
    background-color: #ffffff;
    border-radius: 6px;
    width: auto;
    justify-content: center;
    align-items: center;
    font-size: 11px;
    margin: 30px auto;
    padding: 10px;
    padding-bottom: 0px;


    @media (min-width: 768px) {
        display: none;  // Hide on screens wider than 768px
    }
`;

const PlatformContainer = styled.label`
    display: flex;
    align-items: center;
    margin: 0 10px; /* Add horizontal margin for spacing */
`;

const Icon = styled.img`
    width: 17px;
    height: 17px;
    margin-right: 3px;
`;

const RadioButton = styled.input`
    margin-right: 3px;
`;

const LabelText = styled.span`
    margin-right: 2px; /* Space between "Platform:" and the first icon */
    font-weight: bold;
`;

const SocialMediaToggle = ({ active, onToggle }) => {
    return (
        <ToggleContainer>
            <LabelText>Platform:</LabelText>
            <PlatformContainer>
                <RadioButton
                    type="radio"
                    name="socialMedia"
                    checked={active === 'twitter'}
                    onChange={() => onToggle('twitter')}
                />
                <Icon src={twitterLogo} alt="Twitter" />
                Twitter
            </PlatformContainer>
            <PlatformContainer>
                <RadioButton
                    type="radio"
                    name="socialMedia"
                    checked={active === 'instagram'}
                    onChange={() => onToggle('instagram')}
                />
                <Icon src={instagramLogo} alt="Instagram" />
                Instagram
            </PlatformContainer>
            <PlatformContainer>
                <RadioButton
                    type="radio"
                    name="socialMedia"
                    checked={active === 'youtube'}
                    onChange={() => onToggle('youtube')}
                />
                <Icon src={youtubeLogo} alt="Youtube" />
                Youtube
            </PlatformContainer>
        </ToggleContainer>
    );
};

export default SocialMediaToggle;
