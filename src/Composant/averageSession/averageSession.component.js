import "./css/averageSession.style.css"

import React, { useState, useEffect } from 'react';
import fetchUserAverageSessions from '../../Shares/services/mockAverageSession';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts';

import AverageModel from '../../Shares/models/AverageModel';


function AverageSession({ userId }) {
    const [averageSessions, setAverageSessions] = useState([]);

    useEffect(() => {
        fetchUserAverageSessions(userId)
          .then((data) => {
            // Vérifiez que data.data.sessions existe avant de le traiter
            if (data && data.data && data.data.sessions && Array.isArray(data.data.sessions)) {
              const sessionsData = data.data.sessions.map((session) => {
                // Créez une instance de AverageModel pour chaque session
                return new AverageModel(session.day, session.sessionLength);
              });
              const transformedData = transformDaysToLetters(sessionsData);
              setAverageSessions(transformedData);
            } else {
              console.error("Données de session moyenne non disponibles");
            }
          })
          .catch((error) => console.error(error));
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
    

      return (
        <div className='graph_average__container'>
            <LineChart width={200} height={200} data={averageSessions} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <XAxis dataKey="day" tick={{ fill: '#FFFFFF' }} />
                <YAxis hide/>
                <Tooltip content={<CustomTooltip />} />
                <Legend align="center" verticalAlign="top" height={36} />
                <Line 
                    type="monotone"
                    dataKey="sessionLength"
                    name="Durée moyenne des sessions"
                    stroke="#FFFFFF" 
                    activeDot={{ r: 8, stroke: '#FFFFFF' }}
                />
            </LineChart>
        </div>
      );
    }
  
  export default AverageSession;