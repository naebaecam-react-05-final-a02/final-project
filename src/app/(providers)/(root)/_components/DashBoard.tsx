'use client';

import { useWeights } from '@/hooks/dashboard/useDashBoard';
import { RANGE_OPTIONS } from '@/utils/chartRange';
import GradeProgress from './GradeProgress';
import TodoProgress from './TodoProgress';
import WeightChart from './WeightChart';

// 식단은 넘기는거 말고 오늘것만
//TODO 그래프 불러오는동안(로딩) 없어지는거 손봐야함..
const DashBoard = ({ query }: { query: string }) => {
  const { data: weights, isLoading } = useWeights(query ?? RANGE_OPTIONS.last_7_days);

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
        {weights && <WeightChart weightsData={weights} />}
      </div>
    </main>
  );
};

export default DashBoard;
