import React from 'react';
import { Link } from 'react-router-dom';
import "./css/buttonCard.style.css"



function ButtonCardComp({id}) {
  return (
    <div className="container">
      <Link to={`/user/${id}`} className="button">
        <div className="button__line"></div>
        <div className="button__line"></div>
        <span className="button__text">Profil</span>
        <div className="button__drow1"></div>
        <div className="button__drow2"></div>
      </Link>
    </div>
  );
}

export default ButtonCardComp;