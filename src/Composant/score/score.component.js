import "./css/score.style.css"

import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

function ScoreComponent({ score }) {
  // Vérifie que le score est bien entre 0 et 1
  if (score < 0 || score > 1) {
    console.error("Score doit être entre 0 et 1");
    return null;
  }

  // Prépare les données pour le graphique
  const data = [
    { name: 'Score', value: score },
    { name: 'Reste', value: 1 - score }
  ];
  const COLORS = ['#FF0000', '#FFFFFF'];  // couleur de la barre de score
  
  // Composant de légende personnalisé
  const renderLegend = (props) => {
    const { payload } = props;
    return (
      <ul>
        {payload.map((entry, index) => (
          entry.value === 'Score' && <li key={`item-${index}`} style={{ color: 'black' }}>{entry.value}</li>
        ))}
      </ul>
    );
  };

  return (
    <div className="score-container">
      <PieChart width={200} height={200}>
        <Legend align="center" verticalAlign="top" height={5} content={renderLegend} />
        <Pie
          data={data}
          cx={100}
          cy={100}
          startAngle={90}
          endAngle={-270}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {
            data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
          }
        </Pie>
        <Tooltip />
        <text x={105} y={90} textAnchor="middle" dominantBaseline="middle" style={{ fontSize: '20px', fill: '#000', fontWeight: 'bold' }}>{`${(score*100).toFixed(0)}%`}</text>
        <text x={105} y={105} textAnchor="middle" dominantBaseline="middle" style={{ fontSize: '12px', fill: '#000' }}>de votre</text>
        <text x={105} y={120} textAnchor="middle" dominantBaseline="middle" style={{ fontSize: '12px', fill: '#000' }}>objectif</text>
      </PieChart>
    </div>
  );
}

export default ScoreComponent;