import { USER_PERFORMANCE } from "../mockData";
import { PerformanceDataModel, KindElementModel } from '../models/PerformanceModel';

// Fonction pour récupérer les données depuis l'API
async function fetchPerformanceFromAPI(userId) {
  const response = await fetch(`http://localhost:8080/user/${userId}/performance`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const apiData = await response.json();

  const performanceDataModels = apiData.data.data.map(data => new PerformanceDataModel(data.value, data.kind));
  const kindElementModels = Object.entries(apiData.data.kind).map(([id, name]) => new KindElementModel(id, name));

  return { performanceDataModels, kindElementModels };
}

// Fonction pour récupérer les données depuis le mock
function fetchPerformanceFromMock(userId) {
  const mockUserPerformance = USER_PERFORMANCE.find(performance => performance.userId === Number(userId));

  if (mockUserPerformance) {
    const performanceDataModels = mockUserPerformance.data.map(data => new PerformanceDataModel(data.value, data.kind));
    const kindElementModels = Object.entries(mockUserPerformance.kind).map(([id, name]) => new KindElementModel(id, name));

    return { performanceDataModels, kindElementModels };
  } else {
    throw new Error('User performance data not found in mock data');
  }
}

export { fetchPerformanceFromAPI, fetchPerformanceFromMock };