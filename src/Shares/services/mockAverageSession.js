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
    return mockData;
  }
};

const getUserAverageSessionsFromMock = (userId) => {
  const mockData = USER_AVERAGE_SESSIONS.find((data) => data.userId === userId);
  return mockData ? mockData.sessions : [];
};

export default fetchUserAverageSessions;