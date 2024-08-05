import Card from '@/components/Card';
import Mobile from '@/layouts/Mobile';
import api from '@/service/service';
import { createClient } from '@/supabase/server';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import DashBoardLevel from './_components/DashBoardLevel';
import DietsLog from './_components/DietsLog';
import ExerciseTodoList from './_components/ExerciseTodoList';
import DashBoardJoinedChallenges from './_components/JoinedChallenges';
import WeightChart from './_components/WeightChart';

const RootPage = async ({ searchParams: { query } }: { searchParams: { query: string } }) => {
  const supabase = createClient();
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ['weights'],
      queryFn: () => api.dashboard.getWeights(supabase, query),
    }),
    queryClient.prefetchQuery({
      queryKey: ['diets', { date: format(new Date(), 'yyyy-MM-dd') }],
      queryFn: () => api.dashboard.getDiets(supabase, new Date()),
    }),
    queryClient.prefetchQuery({
      queryKey: ['exercises', { date: format(new Date(), 'yyyy-MM-dd') }],
      queryFn: () => api.dashboard.getExercises(supabase, new Date()),
    }),
  ]);

  const joinedChallenges = await api.dashboard.getJoinedChallenges(supabase);

  return (
    <Mobile>
      <div className="w-full px-4">
        <main className="mb-2 flex flex-col gap-y-2">
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
    </Mobile>
  );
};

export default RootPage;
