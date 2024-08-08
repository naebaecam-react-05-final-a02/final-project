import Card from '@/components/Card';
import { ExercisesQueryKeys } from '@/hooks/exercises/queries';
import Mobile from '@/layouts/Mobile';
import api from '@/service/service';
import { createClient } from '@/supabase/server';
import { getFormattedDate } from '@/utils/dateFormatter';
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
      queryKey: ExercisesQueryKeys.detail(getFormattedDate(new Date())),
      queryFn: () => api.dashboard.getExercises(supabase, new Date()),
    }),
    queryClient.prefetchQuery({
      queryKey: ['joinedChallenge'],
      queryFn: () => api.dashboard.getJoinedChallenges(supabase),
    }),
  ]);

  return (
    <Mobile>
      <div className="w-full px-4">
        <main className="mb-2 flex flex-col gap-y-2">
          {/* 등급/투두 진행 상황 */}
          <div className="grid grid-cols-[160px_1fr] gap-x-3 select-none ">
            <Card
              className="border-[1px] border-white/15  to-97% w-full aspect-square rounded-[20px] 
            flex flex-col gap-y-4 items-center justify-between overflow-hidden relative text-white "
            >
              <DashBoardLevel />
              <div
                className="absolute w-full h-5 bg-black/30 text-white/60 font-bold  left-0 bottom-0 right-0
            rounded-b-[20px] flex justify-center text-sm"
              >
                개발중이에요!
              </div>
            </Card>

            <Card className=" w-full  flex flex-col items-start ">
              <HydrationBoundary state={dehydrate(queryClient)}>
                <DashBoardJoinedChallenges />
              </HydrationBoundary>
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
          <Card className="relative size-full h-[250px] select-none">
            <HydrationBoundary state={dehydrate(queryClient)}>
              <WeightChart query={query} />
            </HydrationBoundary>
            <div
              className="absolute w-full h-5 bg-black/30 text-white/60 font-bold  left-0 bottom-0 right-0
            rounded-b-[20px] flex justify-center text-sm"
            >
              현재는 더미 데이터로 표시됩니다.
            </div>
          </Card>
        </main>
      </div>
    </Mobile>
  );
};

export default RootPage;
