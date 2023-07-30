import React from 'react';
import { Link } from 'react-router-dom';
import "./css/header.style.css"
import Logo from "../../Shares/assets/logo.png"


function HeaderLayout() {
  return (
    <header>
      <div className="header_main-container">
        <div className="header_logo">
            <img src={Logo} alt="Logo du site SportSee"/>
        </div>
        
        <div className="header_menu">
        <nav>
            <ul>
                <li><Link to="/">Acceuil</Link></li>
                <li><Link to="/">Profil</Link></li>
                <li><Link to="/">Réglage</Link></li>
                <li><Link to="/">Communauté</Link></li>
            </ul>
        </nav>
      </div>
      </div>
    </header>
  );
}

export default HeaderLayout;