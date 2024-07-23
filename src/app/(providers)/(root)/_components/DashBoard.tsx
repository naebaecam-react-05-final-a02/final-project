'use client';

import { useGetUser } from '@/hooks/auth/useUsers';
import { createClient } from '@/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { format, startOfDay, subDays } from 'date-fns';
import { useSearchParams } from 'next/navigation';
import GradeProgress from './GradeProgress';
import TodoProgress from './TodoProgress';
import WeightChart from './WeightChart';

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

// 식단은 넘기는거 말고 오늘것만
// 체중은 그래프, 날짜별? 날짜선택
const RANGE_OPTIONS = {
  last_7_days: {
    startDate: format(startOfDay(subDays(new Date(), 6)), 'yyyy-MM-dd'),
  },
  last_30_days: {
    startDate: format(startOfDay(subDays(new Date(), 29)), 'yyyy-MM-dd'),
  },
  last_90_days: {
    startDate: format(startOfDay(subDays(new Date(), 89)), 'yyyy-MM-dd'),
  },
  last_365_days: {
    startDate: format(startOfDay(subDays(new Date(), 364)), 'yyyy-MM-dd'),
  },
  all_time: {
    startDate: null,
  },
};

function getRangeOption(range: string | null) {
  if (range == null) return;
  return RANGE_OPTIONS[range as keyof typeof RANGE_OPTIONS];
}

type WeightChartType = {
  date: string;
  id: number;
  userId: string;
  weight: number;
};
const DashBoard = () => {
  // const { data: weights, isLoading } = useGetWeights();
  const { data: user } = useGetUser();
  const params = useSearchParams();
  const query = params.get('query');

  const dataRange = getRangeOption(query) || RANGE_OPTIONS.last_7_days;

  console.log('USER___', user, dataRange);

  const { data: chartData, isLoading } = useQuery({
    queryKey: ['chart', { range: query }],
    queryFn: async () => {
      const supabase = createClient();
      const startDate = dataRange.startDate || '1994-12-13';
      const response = await supabase
        .from('weights')
        .select('*')
        .eq('userId', '0f15cea5-f25e-436b-a1f7-e0dbbc888f37')
        .gte('date', startDate);
      console.log('RESPONSE___', response);
      return response.data as WeightChartType[];
    },
    staleTime: Infinity,
  });

  console.log('CHART DATA___', chartData);

  return (
    <main className="mb-2 flex flex-col gap-y-2">
      {/* 진행중인 참여형 챌린지 */}
      <div className="bg-gray-300 border border-gray-500 flex items-center justify-center h-20">
        진행중인 참여형 챌린지
      </div>

      {/* 등급/투두 진행 상황 */}
      <div className="grid grid-cols-2 gap-x-1">
        <div className="bg-gray-300 border-gray-500 border h-[140px] flex flex-col gap-y-4 items-center justify-center">
          <h3>등급</h3>
          <div className="flex flex-col gap-y-1 w-[140px] justify-center items-center">
            <h4 className="font-bold">Lv.2</h4>
            <GradeProgress />
          </div>
        </div>
        <div className="bg-gray-300 border-gray-500 border h-[140px] flex flex-col items-center justify-center">
          <h4>투두 진행 상황</h4>
          <TodoProgress />
        </div>
      </div>

      {/* 운동 투두 기록 */}
      <div className="bg-gray-300 border-gray-500 border h-[140px] flex items-center justify-center">
        운동 투두 기록
      </div>

      {/* 식단 기록 */}
      <div className="bg-gray-300 border-gray-500 border h-[140px] flex items-center justify-center">식단 기록</div>

      {/* 체중 변화 그래프 */}
      <div className="bg-gray-300 border-gray-500 border h-[200px] flex flex-col items-center justify-center select-none">
        {<WeightChart chartDatas={chartData!} />}
      </div>
    </main>
  );
};

export default DashBoard;
