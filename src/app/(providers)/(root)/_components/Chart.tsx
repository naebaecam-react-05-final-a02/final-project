'use client';

import { useGetWeights } from '@/hooks/dashboard/useDashBoard';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const data = [
  { weight: 60, date: '07-15', test: 40 },
  { weight: 73, date: '07-16', test: 54 },
  { weight: 74, date: '07-16', test: 23 },
  { weight: 53, date: '07-17', test: 76 },
  { weight: 68, date: '07-18', test: 98 },
  { weight: 66, date: '07-19', test: 66 },
  { weight: 33, date: '07-20', test: 55 },
];

const Chart = () => {
  const { data: weights, isLoading } = useGetWeights();
  if (isLoading) return <div>나우 로우딩...</div>;
  console.log('WEIGHTS___', weights);

  const minWeight = Math.min(...data.map((d) => d.weight));
  const maxWeight = Math.max(...data.map((d) => d.weight));
  const yAxisMin = Math.floor(minWeight / 10) * 10;
  const yAxisMax = Math.ceil((maxWeight + 1) / 10) * 10;

  return (
    <ResponsiveContainer width="100%" minHeight={120}>
      <LineChart data={data} margin={{ right: 15, left: -15 }}>
        <CartesianGrid stroke="black" fill="#ccc" />
        <XAxis dataKey="date" stroke="black" tick={{ fontSize: 12 }} />
        <YAxis
          domain={[yAxisMin, yAxisMax]}
          tickFormatter={(tick) => `${tick}kg`}
          stroke="black"
          tick={{ fontSize: 12 }}
        />
        <Tooltip formatter={(value) => `${value}kg`} />
        <Line dot={false} dataKey="weight" stroke="blue" />
        <Line dot={false} dataKey="test" stroke="red" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Chart;
