import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Header from './Header';
import WelcomeSection from './WelcomeSection';
import ContentContainer from './ContentContainer';
import RightContainer from './RightContainer';
import SocialMediaToggle from './SocialMediaToggle';  // Make sure this is correctly imported
import sLogo from './s.png';
import sdLogo from './sd.png';
import kdLogo from './kd.png';
import lLogo from './l.png';
import mpLogo from './mp.png';
import vLogo from './v.png';
import cLogo from './c.png';
import mLogo from './moderat.png';

const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');
    body {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
`;

const AppContainer = styled.div`
    background-color: rgba(255, 255, 255, 0.13);
    color: black;
    display: flex;
    flex-direction: column;
`;

const MainContent = styled.div`
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace
    flex: 1;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    padding-top: 45px;
    position: relative;
    z-index: 1;
    background-color: rgba(255, 255, 255, 0.07);
    color: #100404;
    width: 100%;
    padding-bottom: 10px;
    margin-bottom: 27px;
`;

const BodyContent = styled.div`
    width: 80%;
    max-width: 1200px;
    background: #ffffff;
    color: rgba(28, 28, 28, 0.98);
    padding: 20px 20px;
    text-align: center;
    position: relative;
    margin: -30px auto 0;

    @media (max-width: 768px) {
        width: 100%;
        padding: 10px;
    }

    h2 {
        margin-bottom: 30px;
        margin-top: 50px;
        font-size: 26px;
        font-family: Roboto;
        font-weight: bold;
    }
`;


const ContentWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    width: 100%;
    margin: 0 auto;
    @media (max-width: 768px) {
        display: none;
    }
`;

const PartyLogos = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    margin-bottom: 25px;

    img {
        margin: 0 5px;
        width: 30px;
        height: 30px;
        cursor: pointer;
        border-radius: 50%;
        border: 2px solid transparent;
    }

    img.selected {
        border-color: #6092f1;
    }
`;

const logos = {
    S: sLogo,
    SD: sdLogo,
    KD: kdLogo,
    L: lLogo,
    MP: mpLogo,
    V: vLogo,
    C: cLogo,
    M: mLogo,
};

function useWindowSize() {
    const [size, setSize] = useState([window.innerWidth]);
    useEffect(() => {
        const handleResize = () => {
            setSize([window.innerWidth]);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return size;
}

function App() {
    const [selectedParties, setSelectedParties] = useState([]);
    const [activeContainer, setActiveContainer] = useState('twitter');
    const [width] = useWindowSize();

    const isMobile = width < 768; // Assume 768px as the breakpoint between desktop and mobile

    const handleLogoClick = (party) => {
        setSelectedParties(prevSelected => {
            if (prevSelected.includes(party)) {
                return prevSelected.filter(p => p !== party);
            } else {
                return [...prevSelected, party];
            }
        });
    };

    return (
        <AppContainer>
            <GlobalStyle />
            <Header />
            <WelcomeSection />
            <MainContent>
                <BodyContent>
                    <h2>Senaste</h2>
                    {isMobile && <SocialMediaToggle active={activeContainer} onToggle={setActiveContainer} />}
                    <p>Tryck på partiet du vill se inlägg ifrån</p>
                    <PartyLogos>
                        {Object.keys(logos).map(party => (
                            <img
                                key={party}
                                src={logos[party]}
                                alt={`${party} logo`}
                                className={selectedParties.includes(party) ? 'selected' : ''}
                                onClick={() => handleLogoClick(party)}
                            />
                        ))}
                    </PartyLogos>
                    {isMobile ? (
                        activeContainer === 'twitter' ? <ContentContainer filter={selectedParties} /> : <RightContainer filter={selectedParties} />
                    ) : (
                        <ContentWrapper>
                            <ContentContainer filter={selectedParties} />
                            <RightContainer filter={selectedParties} />
                        </ContentWrapper>
                    )}
                </BodyContent>
            </MainContent>
        </AppContainer>
    );
}

export default App;
