import React from 'react';
import styled from 'styled-components';
import { ReactComponent as WelcomeImg } from './welcomeimg.svg'; // Ensure the path is correct

const WelcomeContainer = styled.section`
    width: 80%;
    max-width: 1200px;
    display: flex;
    flex-direction: row; // Align items side-by-side
    align-items: center; // Align items vertically center
    justify-content: space-between; // Space between text and SVG
    padding: 50px 20px;
    background-color: white;
    margin: 0 auto;
    padding-top: 120px;
    margin-bottom: 1px;

    @media (max-width: 768px) {
        display: none; // Hide the entire container on small screens
    }
`;

const WelcomeTextContainer = styled.div`
    max-width: 600px; // Limit the width of the text container
`;

const WelcomeTitle = styled.h1`
    font-size: 5.5em;
    color: black;
    margin: 0 0 20px;
`;

const WelcomeSubtitle = styled.h2`
    font-size: 2.5em;
    color: black;
    margin: 0 0 20px;
    margin-left: 4px;
    
    
`;

const WelcomeText = styled.p`
    font-size: 1.7em;
    color: gray;
`;

const WelcomeSection = () => (
    <WelcomeContainer>
        <WelcomeTextContainer>
            <WelcomeTitle>Välkommen</WelcomeTitle>
            <WelcomeSubtitle>till samladpolitik</WelcomeSubtitle>
            <WelcomeText>
                Vi vill göra det enklare för dig som är intresserad av politik. Istället för att behöva leta igenom alla sociala medier för att hitta de senaste inläggen från våra svenska politiker, kan du nu hitta allt du behöver på ett och samma ställe här!
            </WelcomeText>
        </WelcomeTextContainer>
        <WelcomeImg style={{ width: '45%', height: 'auto', }} />
    </WelcomeContainer>
);

export default WelcomeSection;
