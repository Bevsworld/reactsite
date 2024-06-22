// src/Footer.js
import React from 'react';

const Footer = () => {
  const footerStyle = {
    backgroundColor: 'rgba(0,0,0,0.82)',
    color: '#fff',
    padding: '20px 0',
    textAlign: 'center',
    borderRadius: '5px',
    borderTopLeftRadius:"1%",
    borderTopRightRadius:"1%",
    height:"30px",
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    maxWidth: '1200px',
    margin: '0 auto',
  };

  const sectionStyle = {
    flex: '1',
    minWidth: '250px',
    margin: '10px 0',
  };

  const headerStyle = {
    marginBottom: '15px',
    fontSize: '18px',
  };

  const paragraphStyle = {
    fontSize: '14px',
    lineHeight: '1.5',
  };

  const listStyle = {
    listStyle: 'none',
    padding: '0',
  };

  const listItemStyle = {
    margin: '5px 0',
  };

  const linkStyle = {
    color: '#fff',
    textDecoration: 'none',
  };

  const socialLinksStyle = {
    display: 'flex',
    justifyContent: 'center',
  };

  const socialLinkItemStyle = {
    margin: '0 10px',
    color: '#fff',
    textDecoration: 'none',
    fontSize: '20px',
  };

  const footerBottomStyle = {
    marginTop: '20px',
    fontSize: '14px',
  };

  return (
    <footer style={footerStyle}>

    </footer>
  );
};

export default Footer;
