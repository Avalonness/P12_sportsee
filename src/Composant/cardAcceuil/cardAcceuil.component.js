import "./css/cardAcceuil.style.css"
import React from 'react';
import ButtonCardComp from '../buttonCard/buttonCard.component';



function CardAcceuilComp({id, firstName, lastName, age}) {

  return (
      <div className="cardAcceuil_container">
        <div className="cardAcceuil_content">
        <div className="card__details">
    <ul>
     <li>Nom: {lastName}</li>
     <li>Prénom: {firstName}</li>
     <li>Âge: {age}</li>

     <li><ButtonCardComp id={id}/></li>
    </ul>
   </div>
        </div>
      </div>
  );
}

export default CardAcceuilComp;