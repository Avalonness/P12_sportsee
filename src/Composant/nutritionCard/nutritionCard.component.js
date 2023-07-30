import React from 'react';
import "./css/nutritionCard.style.css"
import Calories from "../../Shares/assets/logo/profil/energy.svg";
import Proteines from "../../Shares/assets/logo/profil/chicken.svg";
import Glucides from "../../Shares/assets/logo/profil/apple.svg";
import Lipides from "../../Shares/assets/logo/profil/cheeseburger.svg";

function NutritionCardComp({ user }) {
    if (!user || !user.keyData) {
        return <div>Loading...</div>; // Ou un message d'erreur approprié lorsque les données ne sont pas disponibles
      }

  // Fonction pour obtenir l'icône en fonction de la clé
  function getIcon(key) {
    const icons = {
      calorieCount: Calories,
      proteinCount: Proteines,
      carbohydrateCount: Glucides,
      lipidCount: Lipides,
    };

    return icons[key] || null;
  }

  // Fonction pour obtenir le nom d'affichage en fonction de la clé
  function getDisplayName(key) {
    switch (key) {
      case "calorieCount":
        return "Calories";
      case "proteinCount":
        return "Protéines";
      case "carbohydrateCount":
        return "Glucides";
      case "lipidCount":
        return "Lipides";
      default:
        return key;
    }
  }

  function formatValue(key, value) {
    if (key === "calorieCount") {
      return `${value.toLocaleString()}kcal`;
    }
    return `${value}g`;
  }

  return (
    <div className='acceuil_bottom_nutrition'>
      {Object.keys(user.keyData).map((key, index) => (
        <div key={index} className="nutrition_container">
            <div className={`nutrition_content__left ${key}`}>
              <img src={getIcon(key)} alt="icone de navigation pour footer" />
            </div>
            <div className="nutrition_content__right">
                <p>{formatValue(key, user.keyData[key])}</p>
                <p>{getDisplayName(key)}</p>
            </div>
        </div>
      ))}
    </div>
  );
}

export default NutritionCardComp;