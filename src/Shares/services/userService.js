// services/userService.js
const fetchUserData = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8080/user/${userId}`);
      if (response.ok) {
        const userData = await response.json();
        return userData.data;
      } else {
        throw new Error('API error');
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  
  export default fetchUserData;