// WelcomeSection.js
import React, { useRef } from 'react';
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
    padding-bottom: 150px;

    @media (max-width: 768px) {
        display: none; // Hide the entire container on small screens
    }
`;

const WelcomeTextContainer = styled.div`
    max-width: 50%; // Limit the width of the text container
    margin-right: 120px; // Add space between the text container and the image
    flex-shrink: 0; // Prevent shrinking
`;

const WelcomeTitle = styled.h1`
    font-size: 5.5em;
    color: black;
    margin: 0 0 0px;
`;

const WelcomeText = styled.p`
    font-size: 1.4em;
    color: gray;
    width: 600px;
    margin-left: 5px;
`;

const StyledWelcomeImg = styled(WelcomeImg)`
    width: 40%; // Set a specific width for the image
    height: auto;
    flex-shrink: 0; // Prevent shrinking
    padding-left: 50px;
    padding-bottom: 15px;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
`;

const Button = styled.button`
    background-color: #3e3f41; // Example color, you can change as needed
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px 50px;
    font-size: 1em;
    cursor: pointer;
    margin-top: 10px;
    margin-left: 8px;
    

    transition: background-color 0.3s ease;

    &:hover {
        background-color: #0056b3; // Darker shade for hover effect
    }

    &:focus {
        outline: none;
    }
`;

const WelcomeSection = () => {
    const contentRef = useRef(null);

    const scrollToContent = () => {
        contentRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <>
            <WelcomeContainer>
                <WelcomeTextContainer>
                    <WelcomeTitle>Välkommen</WelcomeTitle>

                    <WelcomeText>
                        Är du intresserad av politik, men trött på att behöva hoppa mellan alla sociala platformer för att hålla dig uppdaterad?
                        Då har du kommit rätt!
                        Här hittar du de senaste sociala inläggen fån våra svenska politiker!



                    </WelcomeText>


                    <ButtonContainer>
                        <Button onClick={scrollToContent}>▼</Button>
                    </ButtonContainer>
                </WelcomeTextContainer>
                <StyledWelcomeImg />
            </WelcomeContainer>
            <div ref={contentRef}></div>
        </>
    );
};

export default WelcomeSection;
