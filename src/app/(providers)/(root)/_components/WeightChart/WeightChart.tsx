'use client';

import { useGetUser } from '@/hooks/auth/useUsers';
import api from '@/service/service';
import { createClient } from '@/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { format, subDays } from 'date-fns';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import LoadingImage from '/public/icons/loading.png';

type WeightChartType = {
  query: string;
};

// 체중 입력하는 곳이 없으므로 임시 데이터
let tmp = [];
for (let i = 0; i <= 30; i++) {
  tmp.push({
    id: i + 1,
    date: format(subDays(new Date(), 30 - i), 'yyyy-MM-dd'),
    weight: Math.floor(Math.random() * 20 + 60),
  });
}

const WeightChart = ({ query }: WeightChartType) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [length, setLength] = useState<number>(7);

  const supabase = createClient();
  const { data: user } = useGetUser();
  const { data: weights, error } = useQuery({
    queryKey: ['weights'],
    queryFn: () => api.dashboard.getWeights(supabase, query),
    enabled: !!user,
  });

  useEffect(() => {
    setIsLoading(false);

    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1280) {
        setLength(16);
      } else if (width >= 1024) {
        setLength(13);
      } else if (width >= 768) {
        setLength(11);
      } else if (width >= 640) {
        setLength(9);
      } else {
        setLength(7);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (!weights || isLoading) {
    return (
      <div className="size-full flex flex-col justify-center items-center animate-pulse gap-y-4">
        <Image className="animate-spin" width={35} height={35} src={LoadingImage} alt="로딩이미지" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="size-full flex items-center justify-center flex-col">
        <div className="text-white">체중 데이터를 가져오지 못했습니다.</div>
        <div className="text-xs text-red-300">{weights.error}</div>
        {weights.details && <p className="text-xs text-red-300">상세 정보: {weights.details}</p>}
      </div>
    );
  }

  // if (!weights.data || !weights?.data.length) {
  //   return (
  //     <div className="size-full flex items-center justify-center">
  //       <div className="text-white">체중 데이터가 없습니다.</div>
  //     </div>
  //   );
  // }

  // const weightsArray = [...weights?.data!.map((d) => d.weight)];
  const weightsArray = [...tmp.map((d) => d.weight)];
  const minWeight = Math.min(...weightsArray);
  const maxWeight = Math.max(...weightsArray);
  const ticks = Array.from({ length: maxWeight - minWeight + 3 }, (_, i) => minWeight - 1 + i);

  const chartData = tmp.slice(-length);
  // console.log(length, chartData);
  return (
    <>
      <div className="w-full text-center text-sm text-white/50">나의 체중 변화</div>
      <ResponsiveContainer width="100%" height={'99.5%'} debounce={1} minHeight={100}>
        {/* <LineChart data={weights?.data!} margin={{ right: 10, left: -15, bottom: 10, top: 10 }}> */}
        <LineChart data={chartData} margin={{ right: 0, left: -40, bottom: 10, top: 10 }}>
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

            <filter id="glow" x="-50%" y="-50%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="4.5" result="coloredBlur" />
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
              if (index === chartData.length - 1) {
                return (
                  <circle
                    key={chartData[index].id}
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
                <circle key={chartData[index].id} cx={cx} cy={cy} r={4} fill="gray" stroke="white" strokeWidth={1} />
              );
            }}
            activeDot={{ r: 16 }}
          />
          {/* <Legend
          verticalAlign="top"
          height={36}
          content={({ payload }) => (
            <ul className="p-0 text-xs flex justify-center gap-x-2">
              {payload?.map((e, i) => (
                <li key={i} className="flex items-center gap-x-1">
                  <p className="text-xs font-bold text-white">{e.value}</p>
                </li>
              ))}
            </ul>
          )}
        /> */}
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default WeightChart;
