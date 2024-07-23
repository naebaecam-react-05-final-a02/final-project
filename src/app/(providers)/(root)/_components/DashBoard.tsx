import GradeProgress from './GradeProgress';
import TodoProgress from './TodoProgress';
import WeightChart from './WeightChart';

const DashBoard = () => {
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
      <div className="bg-gray-300 border-gray-500 border h-[140px] flex flex-col items-center justify-center select-none">
        <WeightChart />
      </div>
    </main>
  );
};

export default DashBoard;
