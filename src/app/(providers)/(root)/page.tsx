import useDashBoard from '@/hooks/dashboard/useDashBoard';
import Link from 'next/link';
import DietsLog from './_components/DietsLog';
import ExerciseTodoList from './_components/ExerciseTodoList';
import GradeProgress from './_components/GradeProgress';
import TodoProgress from './_components/TodoProgress';
import WeightChart from './_components/WeightChart';

//TODO 투두 달력으로 선택할수있어야함?
//TODO 각 컴포넌트 안에서 데이터 없을때 표시해야함
const RootPage = async ({ searchParams: { query } }: { searchParams: { query: string } }) => {
  const { weights, diets, exercises } = await useDashBoard(query);

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
        <div className="grid grid-cols-[160px_1fr] gap-x-1 select-none bg-[#1e1e1e]">
          <div
            className="border-[1px] border-white/15 bg-white/5 to-97% w-full aspect-square rounded-[20px] flex flex-col gap-y-4 items-center justify-center overflow-hidden
          relative text-white"
          >
            <div className="w-8 h-full absolute bg-gradient-to-r from-[#12121266] to-[#12121201] left-0"></div>
            <div className="w-8 h-full absolute bg-gradient-to-l from-[#12121266] to-[#12121201] right-0"></div>
            <h3>등급</h3>
            <div className="-rotate-[15deg] flex  w-[100px] justify-center items-center relative ">
              <div className="absolute -left-[95px] -bottom-[11px] -rotate-[15deg] bg-[#37cc85] w-[100px] h-2" />
              <div className="absolute -left-2 rounded-full bg-[#5effb2] p-px size-4 z-10 flex justify-center items-center">
                <div className="size-full rounded-full bg-[#37cc85] border-[1px] border-white/60"></div>
              </div>
              <GradeProgress />
              <div className="absolute -right-2 rounded-full bg-white/10 p-px size-4 z-10 flex justify-center items-center">
                <div className="size-full rounded-full bg-[#292929] border-[1px] border-white/20"></div>
              </div>
              <div className="absolute -right-[95px] -top-[11px] -rotate-[15deg] bg-white/5 w-[100px] h-2" />
            </div>
          </div>

          <div className="bg-gray-300 border-gray-500 border w-full  flex flex-col items-center justify-center">
            <h4>투두 진행 상황</h4>
            <TodoProgress />
          </div>
        </div>

        {/* 운동 투두 기록 */}
        <div className="bg-gray-300 border-gray-500 border  flex items-center justify-center">
          {exercises && <ExerciseTodoList exercises={exercises} />}
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
