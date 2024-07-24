'use client';

import { Tables } from '@/types/supabase';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import DateRange from './DateRange';

const WeightChart = ({ weights }: { weights: Tables<'weights'>[] }) => {
  const avgWeight = (weights.reduce((acc, cur) => acc + cur.weight, 0) / weights.length).toFixed(2);
  const minWeight = Math.min(...weights.map((d) => d.weight));
  const maxWeight = Math.max(...weights.map((d) => d.weight));
  const yAxisMin = Math.floor(Math.min(minWeight, 63) / 5) * 5;
  const yAxisMax = Math.ceil(Math.max(maxWeight, 63) / 5) * 5;

  return (
    <div className="size-full">
      <DateRange />
      <ResponsiveContainer width="99.5%" height={'99.5%'} debounce={1} minHeight={100}>
        <LineChart data={weights} margin={{ right: 10, left: -15, bottom: 10, top: 10 }}>
          <CartesianGrid stroke="gray" fill="white" strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            stroke="black"
            tick={{ fontSize: 10 }}
            padding={{ left: 10, right: 10 }}
            interval={'preserveEnd'}
            // angle={-25}  // 기울기
            // textAnchor="end" // 기울기
          />
          <YAxis
            domain={[yAxisMin, yAxisMax]}
            tickFormatter={(tick) => `${tick}kg`}
            stroke="black"
            tick={{ fontSize: 12 }}
            tickCount={(yAxisMax - yAxisMin) / 5 + 1}
          />
          <Tooltip formatter={(value) => `${value}kg`} />
          <Line
            connectNulls // 안끊기게?
            dataKey="weight"
            stroke="#93c5fd"
            activeDot={{ r: 4 }}
          />
          <ReferenceLine
            y={avgWeight}
            // label={{ value: `Avg: ${avgWeight}kg`, position: 'insideTopLeft', fill: 'green', fontSize: 12 }}
            stroke="#32be65"
            // strokeDasharray="3 3"
          />
          <ReferenceLine
            y={63}
            // label={{ value: `Target: ${65}kg`, position: 'insideTopRight', fill: 'red', fontSize: 12 }}
            stroke="#ff6a6a"
            // strokeDasharray="3 3"
            ifOverflow="extendDomain"
          />
          <Legend
            verticalAlign="top"
            height={36}
            content={({ payload }) => (
              <ul className="p-0 text-xs flex justify-center gap-x-2">
                {payload?.map((e, i) => (
                  <li key={i} className="flex items-center gap-x-1">
                    <div className={`${'size-2'} ${i == 0 ? 'bg-blue-300' : i == 1 ? 'bg-red-300' : 'bg-green-300'}`} />
                    {e.value}
                  </li>
                ))}
              </ul>
            )}
            payload={[
              {
                value: '체중',
                type: 'square',
                id: 'ID01',
                color: '#93c5fd',
              },
              {
                value: '목표',
                type: 'square',
                id: 'ID02',
                color: 'red',
              },
              {
                value: '평균',
                type: 'square',
                id: 'ID03',
                color: 'green',
              },
            ]}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeightChart;
