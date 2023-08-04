import { USER_AVERAGE_SESSIONS } from "../mockData";

const fetchUserAverageSessions = async (userId) => {
  try {
    const response = await fetch(`http://localhost:8080/user/${userId}/average-sessions`);
    if (!response.ok) {
      throw new Error("Erreur avec l'API");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération des données", error);
    const mockData = getUserAverageSessionsFromMock(userId);
    console.log('MockData:', mockData);  // Ajouter cette ligne
    return mockData;
  }
};

const getUserAverageSessionsFromMock = (userId) => {
  const numericUserId = Number(userId);
  const mockData = USER_AVERAGE_SESSIONS.find((data) => data.userId === numericUserId);
  console.log('UserID:', numericUserId);
  console.log('MockData:', mockData);
  return mockData ? { data: { sessions: mockData.sessions } } : { data: { sessions: [] } };
};

export default fetchUserAverageSessions;