import { USER_ACTIVITY } from "../mockData";

export const fetchUserActivity = async (userId) => {
  try {
    const response = await fetch(`http://localhost:8080/user/${userId}/activity`);
    if (response.ok) {
      const userActivity = await response.json();
      return userActivity;
    } else {
      throw new Error('API error');
    }
  } catch (error) {
    console.error(error);
    return null; 
  }
};

export const getUserActivityById = (userId) => {
  const userActivity = USER_ACTIVITY.find((activityData) => activityData.userId === parseInt(userId));
  return userActivity || null; 
};