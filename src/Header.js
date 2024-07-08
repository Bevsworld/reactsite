import React from 'react';
import styled, { keyframes } from 'styled-components';
import {FaInstagram, FaTwitter, FaYoutube} from "react-icons/fa";

// Styling for the header container
const HeaderContainer = styled.header`
    width: 100%;
    padding: 8px;
    padding-left: 45px;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #e0e0e0;
    position: sticky;
    top: 0;
    z-index: 1000;
    font-size: 18px;

    &:hover {
        background-color: rgba(30, 29, 29, 0.03); // Change background on hover
    }
`;

// Animation for each letter
const fadeIn = keyframes`
    from {
        opacity: 0;
        transform: translateY(-20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

// Styling for the logo
const Logo = styled.h1`
  font-size: 1.2em;
  color: black;
  font-family: 'Quicksand', sans-serif;
    cursor: pointer;
    margin-right: 30px;
    

  span {
    opacity: 0;
    animation: ${fadeIn} 0.5s forwards;
    animation-delay: calc(0.1s * var(--i)); // Delay based on index
  }
`;



// The Header component
const Header = () => {
    // Function to reload the page
    const handleLogoClick = () => {
        window.location.reload();
    };

    // Splitting logo text into spans with delayed animations
    const logoText = "samladpolitik".split('').map((char, index) => (
        <span key={index} style={{ '--i': index + 1 }} >{char}</span>
    ));

    return (
        <HeaderContainer>
            <Logo onClick={handleLogoClick}>
                {logoText}
            </Logo>
            <div style={{width: '100%', display: 'flex', justifyContent: 'flex-end', paddingRight: '10px'}}>
                <h2 style={{fontSize: '10px', textAlign: 'left', fontFamily: 'montserrat', fontWeight: 'bold',opacity:'77%'}}>
                    De senaste politiska inläggen ifrån<br/>
                    <FaYoutube style={{marginLeft: '0px', marginRight: '7px', fontSize: '13px', color: 'red'}}/>
                    Youtube
                    <FaTwitter style={{marginLeft: '6px', marginRight: '7px', fontSize: '13px', color: 'deepskyblue'}}/>
                    Twitter
                    <FaInstagram style={{marginLeft: '6px', marginRight: '7px', fontSize: '13px', color: 'orangered'}}/>
                    Instagram
                </h2>
            </div>

        </HeaderContainer>
    );
};

export default Header;