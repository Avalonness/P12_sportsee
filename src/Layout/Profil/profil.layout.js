import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import UserModel from '../../Shares/models/UserModel';
import "./css/profil.style.css"
import NutritionCardComp from '../../Composant/nutritionCard/nutritionCard.component';
import UserActivity from '../../Composant/userActivity/userActivity.component';
import AverageSession from '../../Composant/averageSession/averageSession.component';
import UserPerformance from '../../Composant/performance/performance.component';
import ScoreComponent from '../../Composant/score/score.component';


import fetchUserData from '../../Shares/services/userService'; 
import getMockUserDataById from "../../Shares/services/mockUserService"

function ProfilLayout() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const userData = await fetchUserData(id); // Utilisez la fonction fetchUserData pour récupérer les données
      if (userData) {
        setUser(new UserModel(
          userData.id,
          userData.userInfos.firstName,
          userData.userInfos.lastName,
          userData.userInfos.age,
          userData.todayScore || userData.score,
          userData.keyData
        ));
      } else {
        // Use the new mockUserService to get data from mockData
        const mockUser = getMockUserDataById(id);
        setUser(mockUser);
      }
    };

    fetchData();
  }, [id]);
  
  if (!user) {
    // Afficher un message de chargement ici tant que les données ne sont pas disponibles
    return <div>Loading...</div>;
  }
 
  return (
    <div className="acceuil_main-container">

      <div className='acceuil_top_content'> 
        <p className='acceuil_hello'>Bonjour <span>{user.firstName}</span></p>
        <p className='acceuil_message'>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
      </div>

      <div className='acceuil_bottom_content'> 
        <div className='acceuil_bottom_activite'>
        <UserActivity userId={id} />
        <div className='activite_secondary'>
          <AverageSession userId={id}/>
          <UserPerformance userId={id} />
          <ScoreComponent score={user.todayScore} />
        </div>
        </div>

        <div className='acceuil_bottom_nutrition'>
          <NutritionCardComp user={user} />
        </div>
      </div>
    </div>
  );
}

export default ProfilLayout;