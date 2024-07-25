const ChallengeVerificationListPage = () => {
  return (
    <div className="bg-red-200">
      <h4 className="text-right text-xs font-bold mb-5">오늘 벌써 총 456명이 인증했어요!</h4>
      <ul className="flex flex-col gap-y-4">
        {Array.from({ length: 4 }, () => '1').map((_, i) => (
          <li key={i} className="bg-blue-200 p-4 flex flex-col gap-y-4 border border-gray-400 rounded-lg">
            <div className="flex gap-x-2 items-center">
              <div className="rounded-full bg-gray-200 size-8">{/* 프로필 사진*/}</div>
              <div className="text-sm font-bold">사용자</div>
            </div>
            <div className="size-full bg-gray-200">
              <div className="w-full aspect-video bg-gray-600 text-white border border-gray-500 flex items-center justify-center">
                이미지
              </div>
              <div className="text-xs font-bold p-2">
                <p className="w-full line-clamp-2">
                  오늘 운동 조졌따리~ 오늘 운동 조졌따리~ 오늘 운동 조졌따리~ 오늘 운동 조졌따리~오늘 운동 조졌따리~오늘
                  운동 조졌따리~오늘 운동 조졌따리~
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChallengeVerificationListPage;
