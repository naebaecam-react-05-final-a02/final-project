'use client';

import { useGetWeights } from '@/hooks/dashboard/useDashBoard';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const data = [
  { weight: 60, date: '07-15' },
  { weight: 73, date: '07-16' },
  { weight: 74, date: '07-16' },
  { weight: 53, date: '07-17' },
  { weight: 68, date: '07-18' },
  { weight: 63, date: '07-19' },
  { weight: 33, date: '07-20' },
];

const Chart = () => {
  const { data: weights, isLoading } = useGetWeights();
  if (isLoading) return <div>나우 로우딩...</div>;
  console.log('WEIGHTS___', weights);

  const minWeight = Math.min(...data.map((d) => d.weight));
  const yAxisMin = Math.floor(minWeight / 10) * 10;

  return (
    <ResponsiveContainer width="100%" minHeight={120}>
      <LineChart data={data}>
        <CartesianGrid stroke="black" />
        <XAxis dataKey="date" stroke="black" tick={{ fontSize: 12 }} />
        <YAxis
          domain={[yAxisMin, 'dataMax']}
          tickFormatter={(tick) => `${tick}kg`}
          stroke="black"
          tick={{ fontSize: 12 }}
        />
        <Tooltip formatter={(value) => `${value}kg`} />
        <Line dot={false} dataKey="weight" stroke="black" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Chart;
