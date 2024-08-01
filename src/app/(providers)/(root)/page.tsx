import Card from '@/components/Card';
import { getDiets, getExercises, getJoinedChallenges, getWeights } from '@/hooks/dashboard/useDashBoard';
import { createClient } from '@/supabase/server';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import Link from 'next/link';
import DashBoardLevel from './_components/DashBoardLevel';
import DietsLog from './_components/DietsLog';
import ExerciseTodoList from './_components/ExerciseTodoList';
import DashBoardJoinedChallenges from './_components/JoinedChallenges';
import WeightChart from './_components/WeightChart';

//TODO 참여한 챌린지 및 챌린지 클릭 시 상세 페이지루다가
const RootPage = async ({ searchParams: { query } }: { searchParams: { query: string } }) => {
  const supabase = createClient();
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ['weights'],
      queryFn: () => getWeights(supabase, query),
    }),
    queryClient.prefetchQuery({
      queryKey: ['diets', { date: format(new Date(), 'yyyy-MM-dd') }],
      queryFn: () => getDiets(supabase, new Date()),
    }),
    queryClient.prefetchQuery({
      queryKey: ['exercises', { date: format(new Date(), 'yyyy-MM-dd') }],
      queryFn: () => getExercises(supabase, new Date()),
    }),
  ]);

  const joinedChallenges = await getJoinedChallenges(supabase);

  return (
    <div className="w-full min-h-screen ">
      <Link
        className="bg-[#A6A6A6] w-full mb-5 rounded-md py-2 px-6 transition-all duration-300 ease-in-out hover:translate-y-1 active:translate-y-2 hover:shadow-md border-b-4 border-[#858585]"
        href={'/auth_test'}
      >
        Auth 관련
      </Link>

      <main className="bg-[#292436] mb-2 flex flex-col gap-y-2">
        {/* 등급/투두 진행 상황 */}
        <div className="grid grid-cols-[160px_1fr] gap-x-1 select-none bg-[#292436]">
          <Card
            className="border-[1px] border-white/15 bg-white/5 to-97% w-full aspect-square rounded-[20px] 
            flex flex-col gap-y-4 items-center justify-between overflow-hidden relative text-white "
          >
            <DashBoardLevel />
          </Card>

          <Card className="bg-[#292436] w-full  flex flex-col items-start ">
            <DashBoardJoinedChallenges joinedChallenges={joinedChallenges} />
          </Card>
        </div>

        {/* 운동 투두 기록 */}
        <Card className="size-full min-h-[140px] select-none">
          <HydrationBoundary state={dehydrate(queryClient)}>
            <ExerciseTodoList />
          </HydrationBoundary>
        </Card>

        {/* 식단 기록 */}
        <Card className="size-full relative px-[-20px] text-sm flex flex-col items-center select-none">
          <HydrationBoundary state={dehydrate(queryClient)}>
            <DietsLog />
          </HydrationBoundary>
        </Card>

        {/* 체중 변화 그래프 */}
        <Card className="size-full h-[250px] select-none">
          <HydrationBoundary state={dehydrate(queryClient)}>
            <WeightChart query={query} />
          </HydrationBoundary>
        </Card>
      </main>
    </div>
  );
};

export default RootPage;
