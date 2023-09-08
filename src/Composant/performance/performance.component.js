import "./css/performance.style.css"
import React, { useState, useEffect } from 'react';
import fetchUserPerformance from "../../Shares/services/mockPerformance";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis} from 'recharts';


function UserPerformance({ userId }) {
  const [performanceData, setPerformanceData] = useState({ performanceDataModels: [], kindElementModels: [] });

  useEffect(() => {
    async function fetchPerformance() {
      const fetchedPerformanceData = await fetchUserPerformance(userId);
      setPerformanceData(fetchedPerformanceData);
    }
    fetchPerformance();
  }, [userId]);
  
  // Transforme les IDs de kind en leur nom correspondant
  const idToName = performanceData.kindElementModels.reduce((map, kindElementModel) => {
    map[kindElementModel.id] = kindElementModel.name;
    return map;
  }, {});

  // Permet de formater les éléments en anglais, en français
  const englishToFrenchMap = {
    "cardio": "Cardio",
    "energy": "Énergie",
    "endurance": "Endurance",
    "strength": "Force",
    "speed": "Vitesse",
    "intensity": "Intensité"
  };

  // Prépare les données pour le graphique
  const chartData = performanceData.performanceDataModels.map((performanceModel) => ({
    kind: englishToFrenchMap[idToName[performanceModel.kind]],
    value: performanceModel.value,
  }));

  return (
    <div className="graph_perf__container">
      <RadarChart width={300} height={200} data={chartData} margin={{ top: 30, right: 20, bottom: 0, left: 20}}>
        <PolarGrid stroke="#FFFFFF" />
        <PolarAngleAxis dataKey="kind" tick={{ fill: '#FFFFFF' }} fontSize={12} />
        <Radar name="Performance" dataKey="value" stroke="#FF0000" fill="#FF0000" fillOpacity={0.6} />
      </RadarChart>
    </div>
  );
}

export default UserPerformance;