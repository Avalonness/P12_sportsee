import "./css/userActivity.style.css"
import React, { useState, useEffect } from 'react';
import fetchUserActivity from '../../Shares/services/mockerUserActivity';
import { getUserActivityById } from '../../Shares/services/mockerUserActivity';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import ActivityModel from '../../Shares/models/ActivityModel';

function UserActivity({ userId }) {
  const [userActivity, setUserActivity] = useState(null);
  const [minWeight, setMinWeight] = useState(null);
  const [maxWeight, setMaxWeight] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const activityData = await fetchUserActivity(userId);
        if (activityData && activityData.data) {
          const activitySessions = activityData.data.sessions.map(session => new ActivityModel(
            session.day,
            session.kilogram,
            session.calories
          ));
          setUserActivity(activitySessions);
          calculateWeightRange(activitySessions);
        } else {
          const mockUserActivity = getUserActivityById(userId);
          if (mockUserActivity) {
            const activitySessions = mockUserActivity.sessions.map(session => new ActivityModel(
              session.day,
              session.kilogram,
              session.calories
            ));
            setUserActivity(activitySessions);
            calculateWeightRange(activitySessions);
          } else {
            console.error('Données d\'activité non disponibles');
          }
        }
      } catch (error) {
        console.error(error);
        const mockUserActivity = getUserActivityById(userId);
        if (mockUserActivity) {
          const activitySessions = mockUserActivity.sessions.map(session => new ActivityModel(
            session.day,
            session.kilogram,
            session.calories
          ));
          setUserActivity(activitySessions);
          calculateWeightRange(activitySessions);
        } else {
          console.error('Données d\'activité non disponibles');
        }
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

  return (
    <div>
    <h2 className="graph_titre">Activité quotidienne</h2>
      {minWeight !== null && maxWeight !== null && (
        <BarChart width={800} height={250} data={userActivity}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis yAxisId="left" hide />
          <YAxis yAxisId="right" label={{ value: 'Poids (kg)', angle: -90, position: 'insideLeft' }} domain={[minWeight - 1, maxWeight + 1]} />
          <Tooltip />
          <Legend align="right" verticalAlign="top" height={36} iconType="square" />
          <Bar yAxisId="right" dataKey="kilogram" name="Poids (kg)" fill="#282D30" />
          <Bar yAxisId="left" dataKey="calories" name="Calories Brûlées (kCal)" fill="#E60000" />
        </BarChart>
      )}
    </div>
  );
}

export default UserActivity;