import React, { useState } from 'react';
import styled from 'styled-components';
import twitterLogo from './twitter-logo.png';
import instagramLogo from './instagram-img.png';

const FloatContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const Icon = styled.img`
  width: 40px;
  height: 40px;
  margin-bottom: 10px;
  cursor: pointer;
`;

const SocialMediaFloat = () => {
    const [showIcons, setShowIcons] = useState(false);
    const [activeIcon, setActiveIcon] = useState(null);

    return (
        <FloatContainer>
            <Icon
                src="path_to_your_main_icon.png" // Replace with your main icon path
                alt="Main Icon"
                onClick={() => setShowIcons(!showIcons)}
            />
            {showIcons && (
                <>
                    <Icon
                        src={twitterLogo}
                        alt="Twitter"
                        onClick={() => setActiveIcon('twitter')}
                    />
                    <Icon
                        src={instagramLogo}
                        alt="Instagram"
                        onClick={() => setActiveIcon('instagram')}
                    />
                </>
            )}
            {activeIcon === 'twitter' && <div>Twitter content goes here</div>}
            {activeIcon === 'instagram' && <div>Instagram content goes here</div>}
        </FloatContainer>
    );
};

export default SocialMediaFloat;
