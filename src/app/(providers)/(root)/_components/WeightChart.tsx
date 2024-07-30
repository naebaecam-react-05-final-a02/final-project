'use client';

import { Tables } from '@/types/supabase';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { Legend, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

const WeightChart = ({ weights }: { weights: Tables<'weights'>[] }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // const avgWeight = (weights.reduce((acc, cur) => acc + cur.weight, 0) / weights.length).toFixed(2);
  const weightsArray = [...weights.map((d) => d.weight)];
  const minWeight = Math.min(...weightsArray);
  const maxWeight = Math.max(...weightsArray);
  // const yAxisMin = Math.floor(minWeight / 5) * 5;
  // const yAxisMax = Math.ceil(maxWeight / 5) * 5;
  const ticks = Array.from({ length: maxWeight - minWeight + 3 }, (_, i) => minWeight - 1 + i);

  // console.log(minWeight, maxWeight, ticks);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <div className="size-full">
      {isLoading && (
        <div className="w-full  flex flex-col justify-center items-center animate-pulse">
          <div className="w-full h-6 bg-gray-200 rounded mb-4"></div>
          <div className="w-[95%] h-36 bg-gray-200 rounded"></div>
        </div>
      )}
      {!isLoading && (
        <>
          {/* <DateRange /> */}
          <ResponsiveContainer width="99.5%" height={'99.5%'} debounce={1} minHeight={100}>
            <LineChart data={weights} margin={{ right: 10, left: -15, bottom: 10, top: 10 }}>
              <XAxis
                tickLine={false}
                axisLine={false}
                dataKey="date"
                stroke="#ffffff"
                opacity={0.5}
                tickFormatter={(tick) => format(tick, 'd')}
                tick={{ fontSize: 10 }}
                padding={{ left: 10, right: 10 }}
                interval={'preserveEnd'}
                // angle={-25}  // 기울기
                // textAnchor="end" // 기울기
              />
              <YAxis
                tickLine={false}
                stroke="#ffffff"
                opacity={0.5}
                axisLine={false}
                domain={[minWeight, maxWeight]}
                // tickFormatter={(tick) => `${tick}kg`}
                tick={{ fontSize: 10 }}
                ticks={ticks}
              />
              {/* <Tooltip formatter={(value) => `${value}kg`} /> */}
              <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity={1} />
                </linearGradient>

                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <Line
                connectNulls // 안끊기게?
                dataKey="weight"
                stroke="url(#gradient)"
                dot={({ cx, cy, index }) => {
                  if (index === weights.length - 1) {
                    return (
                      <circle
                        key={weights[index].id}
                        cx={cx}
                        cy={cy}
                        r={4}
                        fill="#12F287"
                        stroke="#ffffff/40"
                        strokeWidth={1}
                        filter="url(#glow)"
                      />
                    );
                  }
                  return (
                    <circle key={weights[index].id} cx={cx} cy={cy} r={4} fill="gray" stroke="white" strokeWidth={1} />
                  );
                }}
                activeDot={{ r: 16 }}
              />
              <Legend
                verticalAlign="top"
                height={36}
                content={({ payload }) => (
                  <ul className="p-0 text-xs flex justify-center gap-x-2">
                    {payload?.map((e, i) => (
                      <li key={i} className="flex items-center gap-x-1">
                        {/* <div className={`${'size-2 bg-blue-300'}`} /> */}
                        <p className="text-xs font-bold text-white">{e.value}</p>
                      </li>
                    ))}
                  </ul>
                )}
              />
            </LineChart>
          </ResponsiveContainer>
        </>
      )}
    </div>
  );
};

export default WeightChart;
