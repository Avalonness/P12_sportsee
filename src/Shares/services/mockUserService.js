import { USER_MAIN_DATA } from '../mockData';
import UserModel from '../models/UserModel';

const getMockUserDataById = (id) => {
  const mockUser = USER_MAIN_DATA.find((userData) => userData.id === parseInt(id));
  if (mockUser) {
    return new UserModel(
      mockUser.id,
      mockUser.userInfos.firstName,
      mockUser.userInfos.lastName,
      mockUser.userInfos.age,
      mockUser.todayScore,
      mockUser.keyData
    );
  } else {
    console.error('Utilisateur non trouvé ou erreur de récupération des données');
    return null;
  }
};

export default getMockUserDataById;