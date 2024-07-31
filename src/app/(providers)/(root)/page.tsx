import { getDiets, getExercises, getWeights } from '@/hooks/dashboard/useDashBoard';
import { createClient } from '@/supabase/server';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import Link from 'next/link';
import DietsLog from './_components/DietsLog';
import ExerciseTodoList from './_components/ExerciseTodoList';
import GradeProgress from './_components/GradeProgress';
import TodoProgress from './_components/TodoProgress';
import WeightChart from './_components/WeightChart';

//TODO 각 컴포넌트 안에서 데이터 없을때 표시해야함
const RootPage = async ({ searchParams: { query } }: { searchParams: { query: string } }) => {
  const supabase = createClient();
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ['weights'],
      queryFn: async () => getWeights(supabase, query),
    }),
    queryClient.prefetchQuery({
      queryKey: ['diets', { date: format(new Date(), 'yyyy-MM-dd') }],
      queryFn: async () => getDiets(supabase, new Date()),
    }),
    queryClient.prefetchQuery({
      queryKey: ['exercises', { date: format(new Date(), 'yyyy-MM-dd') }],
      queryFn: async () => getExercises(supabase, new Date()),
    }),
  ]);

  return (
    <div className="min-h-screen">
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
        <div className="grid grid-cols-[160px_1fr] gap-x-1 select-none bg-[#1e1e1e]">
          <div
            className="border-[1px] border-white/15 bg-white/5 to-97% w-full aspect-square rounded-[20px] flex flex-col gap-y-4 items-center justify-between overflow-hidden
          relative text-white"
          >
            <div className="w-8 h-full absolute bg-gradient-to-r from-[#12121266] to-[#12121201] left-0"></div>
            <div className="w-8 h-full absolute bg-gradient-to-l from-[#12121266] to-[#12121201] right-0"></div>
            <div className="absolute left-4 top-4">
              <h5 className="text-white/50 text-sm">헬린이</h5>
              <h6 className="text-[28px]">Lv.23</h6>
            </div>
            <div className="absolute bottom-9">
              <div className="-rotate-[15deg] flex  w-[100px] justify-center items-center relative ">
                <div className="absolute -left-[95px] -bottom-[11px] -rotate-[15deg] bg-[#37cc85] w-[100px] h-2" />
                <div className="absolute -left-2 rounded-full bg-[#5effb2] p-px size-4 z-10 flex justify-center items-center">
                  <div
                    className="size-full rounded-full bg-[#37cc85] border-[1px] border-white/60"
                    style={{ filter: 'url(#glow)' }}
                  />
                </div>
                <GradeProgress />
                <div className="absolute -right-2 rounded-full bg-white/10 p-px size-4 z-10 flex justify-center items-center">
                  <div className="size-full rounded-full bg-[#292929] border-[1px] border-white/20" />
                </div>
                <div className="absolute -right-[95px] -top-[11px] -rotate-[15deg] bg-white/5 w-[100px] h-2" />
              </div>
            </div>
          </div>

          <div className="bg-gray-300 border-gray-500 border w-full  flex flex-col items-center justify-center">
            <h4>투두 진행 상황</h4>
            <TodoProgress />
          </div>
        </div>

        {/* 운동 투두 기록 */}
        <div className="bg-[#292436] flex items-center justify-center">
          <HydrationBoundary state={dehydrate(queryClient)}>
            <ExerciseTodoList />
          </HydrationBoundary>
        </div>

        {/* 식단 기록 */}
        <div className="bg-[#292436] flex items-center justify-center">
          <HydrationBoundary state={dehydrate(queryClient)}>
            <DietsLog />
          </HydrationBoundary>
        </div>

        {/* 체중 변화 그래프 */}
        <div className="bg-[#292436] h-[250px] flex flex-col items-center justify-center select-none">
          <HydrationBoundary state={dehydrate(queryClient)}>
            <WeightChart query={query} />
          </HydrationBoundary>
        </div>
      </main>
    </div>
  );
};

export default RootPage;
