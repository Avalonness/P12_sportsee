import React from 'react';
import "./css/acceuil.style.css"
import CardAcceuilComp from '../../Composant/cardAcceuil/cardAcceuil.component';
import {USER_MAIN_DATA} from "../../Shares/mockData"
import UserModel from '../../Shares/models/UserModel';



function AcceuilLayout() {

  const users = USER_MAIN_DATA.map((userData) => {
    const { id, userInfos, todayScore, keyData } = userData;
    return new UserModel(id, userInfos.firstName, userInfos.lastName, userInfos.age, todayScore, keyData);
  });

  return (
      <div className="acceuil_main-container">
        <div className="acceuil_main-content">
        <div className="liste_profil">
          <ul>
            {users.map((user) => (
                <CardAcceuilComp key={user.id} id={user.id} firstName={user.firstName} lastName={user.lastName} age={`${user.age} ans`} />
            ))}
          </ul>
          </div>
        </div>
      </div>
  );
}

export default AcceuilLayout;