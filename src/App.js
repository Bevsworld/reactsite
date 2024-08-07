import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import Footer from './Footer';
import Header from './Header';
import ContentContainer from './ContentContainer';
import RightContainer from './RightContainer';
import SocialMediaToggle from './SocialMediaToggle';
import RiksdagenContainer from './RiksdagenContainer';
import YoutubeVids from './YoutubeVids';
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
    *, *::before, *::after {
        box-sizing: border-box;
    }
    body {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        overflow-x: hidden; /* Prevents horizontal scroll */
    }
`;

const AppContainer = styled.div`
    background-color: rgba(255, 255, 255, 0.13);
    color: black;
    display: flex;
    flex-direction: column;
    align-items: center; /* Center child elements horizontally */
    width: 100%;
    overflow-x: hidden; /* Prevents horizontal scroll */
`;

const MainContent = styled.div`
    font-family: 'Montserrat', sans-serif;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative;
    z-index: 1;
    background-color: rgba(255, 255, 255, 0.07);
    color: #100404;
    width: 100%;
    padding-top: 50px;
    padding-bottom: 10px;
    margin-bottom: 27px;
`;

const BodyContent = styled.div`
    width: 90%;
    max-width: 1500px;
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
        font-size: 19px;
        font-weight: bolder;
    }
`;

const ContentWrapper = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: flex-start;
    width: 100%;
    max-width: 1500px;
    margin: 0 auto;
    padding: 20px;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
        padding: 0; /* Adjust padding for mobile view */
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
        <Router>
            <AppContainer>
                <GlobalStyle />
                <Header/>

                <MainContent>
                    <BodyContent>
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
                        {isMobile && <SocialMediaToggle active={activeContainer} onToggle={setActiveContainer}/>}

                        <Routes>
                            <Route path="/youtube" element={<YoutubeVids filter={selectedParties}/>}/>
                            <Route path="/twitter" element={<ContentContainer filter={selectedParties}/>}/>
                            <Route path="/instagram" element={<RightContainer filter={selectedParties}/>}/>
                            <Route path="/riksdagen" element={<RiksdagenContainer filter={selectedParties}/>}/>
                            <Route path="/" element={
                                isMobile ? (
                                    activeContainer === 'twitter' ? <ContentContainer filter={selectedParties}/> :
                                        activeContainer === 'instagram' ? <RightContainer filter={selectedParties}/> :
                                            activeContainer === 'youtube' ? <YoutubeVids filter={selectedParties}/> :
                                                activeContainer === 'riksdagen' ? <RiksdagenContainer filter={selectedParties}/> : null
                                ) : (
                                    <ContentWrapper>
                                        <YoutubeVids filter={selectedParties}/>
                                        <ContentContainer filter={selectedParties}/>
                                        <RightContainer filter={selectedParties}/>
                                    </ContentWrapper>
                                )}
                            />
                        </Routes>

                    </BodyContent>

                </MainContent>
            </AppContainer>
            <Footer />
        </Router>
    );
}

export default App;
