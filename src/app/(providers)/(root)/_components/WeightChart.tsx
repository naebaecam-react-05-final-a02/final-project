'use client';

import { useGetWeights } from '@/hooks/dashboard/useDashBoard';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import DateRange from './DateRange';

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

  // { weight: 60, date: '08-01' },
  // { weight: 62, date: '08-02' },
  // { weight: 63, date: '08-03' },
  // { weight: 63, date: '08-04' },
  // { weight: 64, date: '08-05' },
  // { weight: 65, date: '08-06' },
  // { weight: 65, date: '08-07' },
  // { weight: 66, date: '08-08' },
  // { weight: 65, date: '08-09' },
  // { weight: 63, date: '08-10' },
  // { weight: 61, date: '08-11' },
  // { weight: 59, date: '08-12' },
  // { weight: 58, date: '08-13' },
  // { weight: 58, date: '08-14' },
  // { weight: 60, date: '08-15' },
  // { weight: 63, date: '08-16' },
  // { weight: 64, date: '08-16' },
  // { weight: 63, date: '08-17' },
  // { weight: 65, date: '08-18' },
  // { weight: 66, date: '08-19' },
  // { weight: 65, date: '08-20' },
  // { weight: 63, date: '08-21' },
  // { weight: 62, date: '08-22' },
  // { weight: 61, date: '08-23' },
  // { weight: 59, date: '08-24' },
  // { weight: 58, date: '08-25' },
  // { weight: 57, date: '08-26' },
  // { weight: 55, date: '08-28' },
  // { weight: 57, date: '08-29' },
  // { weight: 58, date: '08-30' },
  // { weight: 59, date: '08-31' },
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
    <div className="size-full">
      <DateRange />
      <ResponsiveContainer width="100%" minHeight={150}>
        <LineChart data={data} margin={{ right: 10, left: -15 }}>
          <CartesianGrid stroke="gray" fill="white" />
          <XAxis dataKey="date" stroke="black" tick={{ fontSize: 12 }} />
          <YAxis
            domain={[yAxisMin, yAxisMax]}
            tickFormatter={(tick) => `${tick}kg`}
            stroke="black"
            tick={{ fontSize: 12 }}
          />
          <Tooltip formatter={(value) => `${value}kg`} />
          <Line dot={false} dataKey="weight" stroke="#8884d8" activeDot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeightChart;
