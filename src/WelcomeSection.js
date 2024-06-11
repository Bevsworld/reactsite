import React from 'react';
import styled from 'styled-components';

const WelcomeContainer = styled.section`
  width: 80%;
  max-width: 1200px;
  padding: 50px 20px;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start; /* Align items to the left */
  text-align: left; /* Align text to the left */
  margin: 0 auto;
    padding-top: 120px;
    margin-bottom: 1px;

  @media (max-width: 768px) {
    width: 91%;
    padding: 30px 10px;
    align-items: center; /* Center items horizontally on small screens */
    text-align: center; /* Center text on small screens */
  }
`;

const WelcomeTitle = styled.h1`
  font-size: 2.5em;
  font-family: 'Georgia', serif;
  color: black;
  margin: 0 0 20px;
    

  @media (max-width: 768px) {
    font-size: 1.7em;
      margin-bottom: 7px;
      margin-top: 25px;
      
  }
`;

const WelcomeSubtitle = styled.h2`
  font-size: 2em;
  font-family: 'Georgia', serif;
  color: black;
  margin: 0 0 20px;

  @media (max-width: 768px) {
    font-size: 1.2em;
  }
`;

const WelcomeText = styled.p`
  font-size: 1.2em;
  color: gray;
  max-width: 600px;

  @media (max-width: 768px) {
    font-size: 1em;
      margin-bottom: 2px;
      padding-bottom: 1px;
      width: 90%;
      
  }
`;

const WelcomeSection = () => (
  <WelcomeContainer>
    <WelcomeTitle>Varmt välkommen</WelcomeTitle>
    <WelcomeSubtitle>till samladpolitik</WelcomeSubtitle>
    <WelcomeText>
      Vi vill underlätta sökandet för dig som politiskt insatt.
      Istället för att söka igenom alla sociala platformer,
      för att hitta de senaste inläggen från våra svenska politiker.
      Så kan du numera hitta allt du behöver. Här, på en och samma plats!
    </WelcomeText>
  </WelcomeContainer>
);

export default WelcomeSection;
