'use client';

import { useGetUser } from '@/hooks/auth/useUsers';
import { getWeights } from '@/hooks/dashboard/useDashBoard';
import { createClient } from '@/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { Legend, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

type WeightChartType = {
  query: string;
};

const WeightChart = ({ query }: WeightChartType) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const supabase = createClient();
  const { data: user } = useGetUser();
  const { data: weights } = useQuery({
    queryKey: ['weights'],
    queryFn: () => getWeights(supabase, query),
    enabled: !!user,
  });

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (!weights || isLoading) {
    return (
      <div className="size-full flex flex-col justify-center items-center animate-pulse gap-y-4">
        <div className="w-20 h-4 rounded-full bg-gray-300" />
        <div className="w-[85%] aspect-video bg-gray-300 rounded relative">
          <div className="absolute bottom-0 left-0 right-0 h-2 bg-gray-400"></div>
          <div className="absolute top-0 bottom-0 left-0 w-2 bg-gray-400"></div>
        </div>
      </div>
    );
  }

  if (weights.error) {
    return (
      <div className="size-full flex items-center justify-center flex-col">
        <div className="text-white">체중 데이터를 가져오지 못했습니다.</div>
        <div className="text-xs text-red-300">{weights.error}</div>
      </div>
    );
  }

  if (!weights.data || !weights?.data.length) {
    return (
      <div className="size-full flex items-center justify-center">
        <div className="text-white">체중 데이터가 없습니다.</div>
      </div>
    );
  }

  const weightsArray = [...weights?.data!.map((d) => d.weight)];
  const minWeight = Math.min(...weightsArray);
  const maxWeight = Math.max(...weightsArray);
  const ticks = Array.from({ length: maxWeight - minWeight + 3 }, (_, i) => minWeight - 1 + i);

  return (
    <ResponsiveContainer width="99.5%" height={'99.5%'} debounce={1} minHeight={100}>
      <LineChart data={weights?.data!} margin={{ right: 10, left: -15, bottom: 10, top: 10 }}>
        <XAxis
          filter="url(#glow)"
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
          filter="url(#glow)"
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
          filter="url(#glow)"
          connectNulls // 안끊기게?
          dataKey="weight"
          stroke="url(#gradient)"
          dot={({ cx, cy, index }) => {
            if (index === weights?.data!.length - 1) {
              return (
                <circle
                  key={weights?.data![index].id}
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
              <circle key={weights?.data![index].id} cx={cx} cy={cy} r={4} fill="gray" stroke="white" strokeWidth={1} />
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
  );
};

export default WeightChart;
