'use client';

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

type WeightChartType = {
  date: string;
  id: number;
  userId: string;
  weight: number;
};

const WeightChart = ({ chartDatas }: { chartDatas: WeightChartType[] }) => {
  const datas = chartDatas || data;
  const avgWeight = (datas.reduce((acc, cur) => acc + cur.weight, 0) / datas.length).toFixed(2);
  const minWeight = Math.min(...datas.map((d) => d.weight));
  const maxWeight = Math.max(...datas.map((d) => d.weight));
  const yAxisMin = Math.floor(Math.min(minWeight, 63) / 5) * 5;
  const yAxisMax = Math.ceil(Math.max(maxWeight, 63) / 5) * 5;

  console.log(chartDatas);

  return (
    <div className="size-full">
      <DateRange />
      <ResponsiveContainer width="99.5%" height={'99.5%'} debounce={1} minHeight={100}>
        <LineChart data={datas} margin={{ right: 10, left: -15, bottom: 10, top: 10 }}>
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
