// Inicio del archivo LandingPage.js
import React from 'react';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <h1>Bienvenido a nuestro Minimarket especializado en Menestras</h1>
      <p>Encuentra las mejores menestras aquí.</p>
      <div className="banner-container">
        <img 
          src={`${process.env.REACT_APP_API_URL}/images/menestras-banner.jpg`} 
          alt="Menestras Banner" 
          className="banner-image" 
        />
      </div>
    </div>
  );
};

export default LandingPage;


// Final del archivo LandingPage.js