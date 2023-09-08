import "./css/userActivity.style.css"
import React, { useState, useEffect } from 'react';
import { fetchUserActivity, getUserActivityById } from '../../Shares/services/mockerUserActivity';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import ActivityModel from '../../Shares/models/ActivityModel';

function UserActivity({ userId }) {
  const [userActivity, setUserActivity] = useState(null);
  const [minWeight, setMinWeight] = useState(null);
  const [maxWeight, setMaxWeight] = useState(null);
  const DEV_MODE = false;

 useEffect(() => {
    const fetchData = async () => {
      let activityData = null;
      
      if (!DEV_MODE) {
        try {
          // Essaye d'abord d'appeler l'API si pas mode de DEV.
          activityData = await fetchUserActivity(userId);
        } catch (error) {
          console.error("Erreur lors de l'appel de l'API", error);
        }
      }

      // Si mode DEV ou que l'appel API a échoué, utilise les données mockées.
      if (DEV_MODE || !activityData || !activityData.data) {
        console.log("PROUT PROUT")
        const mockUserActivity = getUserActivityById(userId);
        if (mockUserActivity) {
          activityData = mockUserActivity;
        } else {
          console.error('Données d\'activité non disponibles');
          return;
        }
      }

      if (activityData && activityData.data && activityData.data.sessions) {
        const activitySessions = activityData.data.sessions.map(session => ({
          ...session,
          day: session.day.split('-')[2]
        }));
        setUserActivity(activitySessions);
        calculateWeightRange(activitySessions);
      } else {
        console.error('activityData ou activityData.data ou activityData.data.sessions est undefined');
      }
    };

    fetchData();
  }, [userId]);

  const calculateWeightRange = (activitySessions) => {
    const weightValues = activitySessions.map(session => session.kilogram);
    setMinWeight(Math.min(...weightValues));
    setMaxWeight(Math.max(...weightValues));
  };

  // Utilisez l'objet userActivity dans votre composant, par exemple :
  if (!userActivity || minWeight === null || maxWeight === null) {
    return <div>Loading...</div>;
  }

  const extractDay = (dateString) => {
    return dateString.split('-')[2];
}

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="info-kg">{`${payload[0].value}kg`}</p>
        <p className="info-kcal">{`${payload[1].value}kCal`}</p>
      </div>
    );
  }
  return null;
};

function CustomLegend() {
  return (
    <div style={{ paddingBottom: '40px' }}>
      <div style={{ display: 'inline-block', marginRight: '10px' }}>
        <span style={{ display: 'inline-block', width: '10px', height: '10px', backgroundColor: '#282D30', marginRight: '5px' }}></span>
        Poids (kg)
      </div>
      <div style={{ display: 'inline-block' }}>
        <span style={{ display: 'inline-block', width: '10px', height: '10px', backgroundColor: '#E60000', marginRight: '5px' }}></span>
        Calories Brûlées (kCal)
      </div>
    </div>
  );
}

  return (
    <div className="activity_user__container">
    <h2 className="graph_titre">Activité quotidienne</h2>
      {minWeight !== null && maxWeight !== null && (
        <div className="wrapper_legend">
          <CustomLegend />
          <BarChart width={650} height={200} data={userActivity}>
            <CartesianGrid strokeDasharray="3 3" vertical={false}/>
            <XAxis dataKey="day" />
            <YAxis yAxisId="left" hide />
            <YAxis yAxisId="right" orientation="right" label={{ value: '', angle: -90, position: 'insideRight' }} domain={[minWeight - 1, maxWeight + 1]} />
            <Tooltip content={<CustomTooltip />} />
            <Bar yAxisId="right" dataKey="kilogram" name="Poids (kg)" fill="#282D30" barSize={10} radius={[10, 10, 0, 0]}/>
            <Bar yAxisId="left" dataKey="calories" name="Calories Brûlées (kCal)" fill="#E60000" barSize={10} radius={[10, 10, 0, 0]}/>
          </BarChart>
        </div>
      )}
    </div>
  );
}

export default UserActivity;