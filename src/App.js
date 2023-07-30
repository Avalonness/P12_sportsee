import './App.css';
import './index.css'
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HeaderLayout from './Layout/Header.layout/header.layout';
import FooterLayout from './Layout/Footer.layout/footer.layout';
import AcceuilLayout from './Layout/Acceuil/acceuil.layout';
import ProfilLayout from './Layout/Profil/profil.layout';


function App() {
  return (
    <div className='main_container'>
      <div className="content">
        <BrowserRouter>
          <HeaderLayout />
          <div className="second_container">
          <FooterLayout />
          <Routes>
            <Route path='/user/:id' element={<ProfilLayout />} />
            <Route path="/" element={<AcceuilLayout />} />
          </Routes>
          </div>
        </BrowserRouter>
      </div>
    </div>
  );
}


export default App;