import "./css/averageSession.style.css"

import React, { useState, useEffect } from 'react';
import { fetchUserAverageSessionsAPI, fetchUserAverageSessionsMock } from '../../Shares/services/mockAverageSession';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend} from 'recharts';

import AverageModel from '../../Shares/models/AverageModel';


function AverageSession({ userId }) {
    const [averageSessions, setAverageSessions] = useState([]);
    const DEV_MODE = false;

    useEffect(() => {
      const fetchData = async () => {
          let data;
  
          if (!DEV_MODE) {
              try {
                  // Essaye d'abord d'appeler l'API si n'est pas en mode de développement.
                  data = await fetchUserAverageSessionsAPI(userId);
  
                  // Vérifie la validité des données.
                  if (!data || !data.data || !data.data.sessions || !Array.isArray(data.data.sessions)) {
                      throw new Error("Données de session moyenne non disponibles depuis l'API");
                  }
              } catch (error) {
                  console.error("Erreur lors de l'appel de l'API, utilisation des données mockées.", error);
              }
          }
  
          // Si mode DEV ou que l'appel API a échoué, utilise les données mockées.
          if (DEV_MODE || !data) {
              data = fetchUserAverageSessionsMock(userId);
          }
  
          if (data && data.data && data.data.sessions && Array.isArray(data.data.sessions)) {
              const sessionsData = data.data.sessions.map((session) => {
                  return new AverageModel(session.day, session.sessionLength);
              });
              const transformedData = transformDaysToLetters(sessionsData);
              setAverageSessions(transformedData);
          } else {
              console.error("Données de session moyenne non disponibles");
          }
      };
  
      fetchData();
  }, [userId]);
    
      if (!averageSessions || averageSessions.length === 0) {
        return <div>Loading...</div>;
      }
    
      function transformDaysToLetters(data) {
        const dayToLetterMap = {
          1: 'L',
          2: 'M',
          3: 'M',
          4: 'J',
          5: 'V',
          6: 'S',
          7: 'D',
        };
      
        return data.map((session) => {
          return { ...session, day: dayToLetterMap[session.day] };
        });
      }   

      function CustomTooltip({ active, payload, label }) {
        if (active && payload && payload.length) {
          return (
            <div className="custom-tooltip" style={{ padding: '10px', background: '#FFFFFF' }}>
              <p className="label">{`${payload[0].value} min`}</p>
            </div>
          );
        }
        return null;
      }
    
      const sIndex = averageSessions.findIndex(session => session.day === 'S');
      const dIndex = averageSessions.findIndex(session => session.day === 'D');

      return (
        <div className='graph_average__container'>
            <LineChart width={200} height={200} data={averageSessions} margin={{ top: 20, right: 0, left: 0, bottom: 5 }}>
                <XAxis dataKey="day" tick={{ fill: '#FFFFFF' }} axisLine={false} />
                <YAxis hide/>
                <Tooltip content={<CustomTooltip />} />
                <Legend align="center" verticalAlign="top" height={36} />            
                <Line 
                    type="monotone"
                    dataKey="sessionLength"
                    name="Durée moyenne des sessions"
                    stroke="#FFFFFF" 
                    dot={false}
                />
            </LineChart>
        </div>
      );
    }
  
  export default AverageSession;