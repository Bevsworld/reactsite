import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Header from './Header';
import WelcomeSection from './WelcomeSection';
import ContentContainer from './ContentContainer';
import RightContainer from './RightContainer';
import sLogo from './s.png';
import sdLogo from './sd.png';
import kdLogo from './kd.png';
import lLogo from './l.png';
import mpLogo from './mp.png';
import vLogo from './v.png';
import cLogo from './c.png';
import mLogo from './moderat.png';

const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300..700&display=swap');
    body {
        font-family: 'Quicksand', monospace;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
`;

const AppContainer = styled.div`
    background-color: white;
    color: black;
    display: flex;
    flex-direction: column;
`;

const MainContent = styled.div`
    font-family: "Montserrat Medium";
    flex: 1;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    padding-top: 5px;
    position: relative;
    z-index: 1;
    background-color: rgb(255, 255, 255); /* Purple background */
    color: #100404;
    width: 100%;
    padding-bottom: 10px;
    margin-bottom: 27px;
    margin-top: 90px;
`;

const BodyContent = styled.div`
    width: 80%;
    max-width: 1200px;
    background: white;
    color: black;
    padding: 20px 20px;
    text-align: center;
    position: relative;
    margin: -30px auto 0; /* Move the content up and center */
    
    @media (max-width: 768px) {
        width: 90%;
        padding: 10px;
    }
`;

const ContentWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    width: 100%;
    margin: 0 auto;

    @media (max-width: 768px) {
        flex-direction: column;
        width: 100%;
    }
`;

const PartyLogos = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;

    img {
        margin: 0 5px;
        width: 30px;
        height: 30px;
        cursor: pointer;
        border-radius: 50%;
        border: 2px solid transparent;
    }

    img.selected {
        border-color: #6633cc; /* Highlight selected logo */
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

function App() {
    const [selectedParties, setSelectedParties] = useState([]); // State to track selected parties

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
                    <p>Här finner du det senaste ifrån dessa partier:</p>
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
                    <ContentWrapper>
                        <ContentContainer filter={selectedParties} />
                        <RightContainer />
                    </ContentWrapper>
                </BodyContent>
            </MainContent>
        </AppContainer>
    );
}

export default App;
