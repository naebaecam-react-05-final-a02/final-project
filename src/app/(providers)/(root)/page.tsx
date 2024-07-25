import { createClient } from '@/supabase/server';
import { DietsLogType } from '@/types/diet';
import { Tables } from '@/types/supabase';
import { getEndOfDayISO, getRangeOption, getStartOfDayISO, RANGE_OPTIONS } from '@/utils/dateFormatter';
import Link from 'next/link';
import DietsLog from './_components/DietsLog';
import ExerciseTodoList from './_components/ExerciseTodoList';
import GradeProgress from './_components/GradeProgress';
import TodoProgress from './_components/TodoProgress';
import WeightChart from './_components/WeightChart';

const getWeightsData = async (query: string) => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const response = await supabase.from('weights').select('*').eq('userId', user?.id).gte('date', query).order('date');

  return response.data as Tables<'weights'>[];
};

const getTodayDiets = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const response = await supabase
    .from('diets')
    .select('*')
    .eq('userId', user?.id)
    .gte('date', getStartOfDayISO())
    .lte('date', getEndOfDayISO())
    .order('date');

  return response.data as DietsLogType;
};

const RootPage = async ({ searchParams: { query } }: { searchParams: { query: string } }) => {
  const [weights, diets] = await Promise.all([
    getWeightsData(getRangeOption(query)?.startDate ?? RANGE_OPTIONS.last_7_days.startDate),
    getTodayDiets(),
  ]);

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
          <div className="bg-gray-300 border-gray-500 border h-[140px] flex flex-col gap-y-4 items-center justify-center overflow-hidden">
            <h3>등급</h3>
            <div className="-rotate-[15deg] flex  w-[100px] justify-center items-center relative ">
              <div className="absolute -left-[90px] -bottom-5 -rotate-[30deg] bg-[#37cc85] w-[100px] h-2" />
              <div className="absolute -left-2 rounded-full bg-[#37cc85]/30 p-[2px] size-4 z-10 flex justify-center items-center">
                <div className="size-full rounded-full bg-white p-px flex justify-center items-center">
                  <div className="size-full rounded-full bg-[#37cc85]"></div>
                </div>
              </div>
              <GradeProgress />
              <div className="absolute -right-2 rounded-full bg-[#37cc85]/30 p-[2px] size-4 z-10 flex justify-center items-center">
                <div className="size-full rounded-full bg-white p-px flex justify-center items-center">
                  <div className="size-full rounded-full bg-[#37cc85]"></div>
                </div>
              </div>
              <div className="absolute -right-[90px] -top-5 -rotate-[30deg] bg-[#37cc85] w-[100px] h-2" />
            </div>
          </div>
          <div className="bg-gray-300 border-gray-500 border h-[140px] flex flex-col items-center justify-center">
            <h4>투두 진행 상황</h4>
            <TodoProgress />
          </div>
        </div>

        {/* 운동 투두 기록 */}
        <div className="bg-gray-300 border-gray-500 border flex items-center justify-center">
          <ExerciseTodoList />
        </div>

        {/* 식단 기록 */}
        <div className="bg-gray-300 border-gray-500 border  flex items-center justify-center">
          {diets && <DietsLog diets={diets} />}
        </div>

        {/* 체중 변화 그래프 */}
        <div className="bg-gray-300 border-gray-500 border h-[200px] flex flex-col items-center justify-center select-none">
          {weights && <WeightChart weights={weights} />}
        </div>
      </main>
    </div>
  );
};

export default RootPage;
