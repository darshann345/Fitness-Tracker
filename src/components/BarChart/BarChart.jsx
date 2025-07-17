import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const WeeklyBarChart = ({ data }) => {
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  const filteredData = data.filter(item => {
    const itemDate = new Date(item.date);
    return itemDate >= oneWeekAgo;
  });

  if (filteredData.length === 0) return null;

  return (
    <div style={{ width: '100%', height: 300, backgroundColor: '#2e2e2e', padding: '1rem', borderRadius: '10px' }}>
      <h2 style={{ color: 'white' }}>Weekly Health Trends</h2>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={filteredData} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={{ fill: 'white' }} />
          <YAxis tick={{ fill: 'white' }} />
          <Tooltip />
          <Legend />
          <Bar dataKey="calorieIntake" fill="#7c6eff" name="Calorie Intake" />
          <Bar dataKey="calorieBurned" fill="#61d095" name="Calorie Burned" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeeklyBarChart;
