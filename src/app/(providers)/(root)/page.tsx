import { createClient } from '@/supabase/server';
import { Tables } from '@/types/supabase';
import { getRangeOption, RANGE_OPTIONS } from '@/utils/chartRange';
import Link from 'next/link';
import GradeProgress from './_components/GradeProgress';
import TodoProgress from './_components/TodoProgress';
import WeightChart from './_components/WeightChart';

export const getWeightsData = async (query: string) => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const response = await supabase.from('weights').select('*').eq('userId', user?.id).gte('date', query).order('date');

  return response.data as Tables<'weights'>[];
};

const RootPage = async ({ searchParams: { query } }: { searchParams: { query: string } }) => {
  const weights = await getWeightsData(getRangeOption(query)?.startDate ?? RANGE_OPTIONS.last_7_days.startDate);

  return (
    <div className="h-screen">
      <Link
        className="bg-[#A6A6A6] rounded-md pt-2 pb-2 pl-6 pr-6 transition-all duration-300 ease-in-out hover:translate-y-1 active:translate-y-2 hover:shadow-md border-b-4 border-[#858585]"
        href={'/auth_test'}
      >
        Auth 관련
      </Link>

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
          {weights && <WeightChart weights={weights} />}
        </div>
      </main>
    </div>
  );
};

export default RootPage;
