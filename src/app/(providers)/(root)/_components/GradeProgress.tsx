'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

const data = [{ name: 'Progress', value: 30 }];

const GradeProgress = () => {
  return (
    <ResponsiveContainer width="100%" height={8}>
      <BarChart layout="vertical" data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
        <XAxis type="number" hide domain={[0, 100]} />
        <YAxis type="category" dataKey="name" hide />
        <Bar fill="white" background={{ fill: 'gray' }} dataKey="value" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default GradeProgress;
