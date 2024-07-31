'use client';

import Card from '@/components/Card';
import { useGetUser } from '@/hooks/auth/useUsers';
import { getWeights } from '@/hooks/dashboard/useDashBoard';
import { createClient } from '@/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { Legend, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

type WeightChartType = {
  query: string;
};

const WeightChart = ({ query }: WeightChartType) => {
  const supabase = createClient();
  const { data: user } = useGetUser();
  const { data: weights = { data: null }, isFetching } = useQuery({
    queryKey: ['weights'],
    queryFn: () => getWeights(supabase, query),
    enabled: !!user,
  });

  const weightsArray = [...weights?.data!.map((d) => d.weight)];
  const minWeight = Math.min(...weightsArray);
  const maxWeight = Math.max(...weightsArray);
  const ticks = Array.from({ length: maxWeight - minWeight + 3 }, (_, i) => minWeight - 1 + i);

  // console.log(minWeight, maxWeight, ticks);

  return (
    <div className="size-full">
      {isFetching && (
        <div className="w-full  flex flex-col justify-center items-center animate-pulse">
          <div className="w-full h-6 bg-gray-200 rounded mb-4"></div>
          <div className="w-[95%] h-36 bg-gray-200 rounded"></div>
        </div>
      )}
      {!isFetching && (
        <Card className="h-full">
          {/* <DateRange /> */}
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
                    <circle
                      key={weights?.data![index].id}
                      cx={cx}
                      cy={cy}
                      r={4}
                      fill="gray"
                      stroke="white"
                      strokeWidth={1}
                    />
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
        </Card>
      )}
    </div>
  );
};

export default WeightChart;
