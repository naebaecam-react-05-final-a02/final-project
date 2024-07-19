import UserProfile from '@/components/UserProfile/UserProfile';

const RootPage = () => {
  return (
    <div className="max-w-[390px] mx-auto border border-red-500">
      <header className="w-full h-14 border-b border-b-gray-500">
        <UserProfile />
      </header>
      <main className="px-5 mt-4 mb-2 flex flex-col gap-y-2">
        {/* 진행중인 참여형 챌린지 */}
        <div className="bg-gray-300 border border-gray-500 flex items-center justify-center h-20">
          진행중인 참여형 챌린지
        </div>

        {/* 등급/투두 진행 상황 */}
        <div className="grid grid-cols-2 gap-x-1">
          <div className="bg-gray-300 border-gray-500 border h-[140px] flex items-center justify-center">등급</div>
          <div className="bg-gray-300 border-gray-500 border h-[140px] flex items-center justify-center">
            투두 진행 상황
          </div>
        </div>

        {/* 운동 투두 기록 */}
        <div className="bg-gray-300 border-gray-500 border h-[140px] flex items-center justify-center">
          운동 투두 기록
        </div>

        {/* 식단 기록 */}
        <div className="bg-gray-300 border-gray-500 border h-[140px] flex items-center justify-center">식단 기록</div>

        {/* 체중 변화 그래프 */}
        <div className="bg-gray-300 border-gray-500 border h-[140px] flex items-center justify-center">그래푸</div>
      </main>
    </div>
  );
};

export default RootPage;
