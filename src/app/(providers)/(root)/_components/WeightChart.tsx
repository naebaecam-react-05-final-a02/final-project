'use client';

import { useGetWeights } from '@/hooks/dashboard/useDashBoard';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const data = [
  { weight: 60, date: '07-01' },
  { weight: 62, date: '07-02' },
  { weight: 63, date: '07-03' },
  { weight: 63, date: '07-04' },
  { weight: 64, date: '07-05' },
  { weight: 65, date: '07-06' },
  { weight: 65, date: '07-07' },
  { weight: 66, date: '07-08' },
  { weight: 65, date: '07-09' },
  { weight: 63, date: '07-10' },
  { weight: 61, date: '07-11' },
  { weight: 59, date: '07-12' },
  { weight: 58, date: '07-13' },
  { weight: 58, date: '07-14' },
  { weight: 60, date: '07-15' },
  { weight: 63, date: '07-16' },
  { weight: 64, date: '07-16' },
  { weight: 63, date: '07-17' },
  { weight: 65, date: '07-18' },
  { weight: 66, date: '07-19' },
  { weight: 65, date: '07-20' },
  { weight: 63, date: '07-21' },
  { weight: 62, date: '07-22' },
  { weight: 61, date: '07-23' },
  { weight: 59, date: '07-24' },
  { weight: 58, date: '07-25' },
  { weight: 57, date: '07-26' },
  { weight: 55, date: '07-28' },
  { weight: 57, date: '07-29' },
  { weight: 58, date: '07-30' },
  { weight: 59, date: '07-31' },
];

const WeightChart = () => {
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
        <XAxis dataKey="date" stroke="black" tick={{ fontSize: 12 }} interval={5} />
        <YAxis
          domain={[yAxisMin, yAxisMax]}
          tickFormatter={(tick) => `${tick}kg`}
          stroke="black"
          tick={{ fontSize: 12 }}
        />
        <Tooltip formatter={(value) => `${value}kg`} />
        <Line dot={false} dataKey="weight" stroke="blue" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default WeightChart;
