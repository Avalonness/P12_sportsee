import { USER_AVERAGE_SESSIONS } from "../mockData";

export const fetchUserAverageSessionsAPI = async (userId) => {
  try {
    const response = await fetch(`http://localhost:8080/user/${userId}/average-sessions`);
    if (!response.ok) {
      throw new Error("Erreur avec l'API");
    }
    return await response.json();
  } catch (error) {
    console.error("Erreur lors de la récupération des données", error);
    throw error;
  }
};

export const fetchUserAverageSessionsMock = (userId) => {
  const numericUserId = Number(userId);
  const mockData = USER_AVERAGE_SESSIONS.find((data) => data.userId === numericUserId);
  return mockData ? { data: { sessions: mockData.sessions } } : { data: { sessions: [] } };
};