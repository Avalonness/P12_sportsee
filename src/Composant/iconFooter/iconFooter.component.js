import React from 'react';
import "./css/iconFooter.style.css"



function IconFooterComp({ backgroundImage}) {
  return (
      <div className="inconfooter_container">
        <div className="iconFooter_content">
            <img src={backgroundImage} alt="icone de navigation pour footer"/>
        </div>
      </div>
  );
}

export default IconFooterComp;