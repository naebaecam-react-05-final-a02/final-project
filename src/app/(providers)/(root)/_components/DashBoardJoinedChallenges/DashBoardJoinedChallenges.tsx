import { joinedChallengesDataType } from '@/types/challenge';
import Link from 'next/link';
import React from 'react';

type DashBoardJoinedChallengesType = {
  joinedChallenges: joinedChallengesDataType;
};

const DashBoardJoinedChallengesLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <h5 className="text-white/50 text-sm">챌린지</h5>
      {children}
    </>
  );
};

const DashBoardJoinedChallenges = ({ joinedChallenges }: DashBoardJoinedChallengesType) => {
  if (joinedChallenges.error) {
    return (
      <DashBoardJoinedChallengesLayout>
        <div className="text-red-300">
          <p className="text-sm">오류가 발생했습니다: {joinedChallenges.error}</p>
          {joinedChallenges.details && <p>상세 정보: {joinedChallenges.details}</p>}
        </div>
      </DashBoardJoinedChallengesLayout>
    );
  }

  if (joinedChallenges.data === null || joinedChallenges.data.length === 0) {
    return (
      <DashBoardJoinedChallengesLayout>
        <p className="text-white/50 text-sm">참여 중인 챌린지가 없습니다.</p>
      </DashBoardJoinedChallengesLayout>
    );
  }

  return (
    <DashBoardJoinedChallengesLayout>
      <ul className="w-full text-sm text-white grid gap-y-4">
        {joinedChallenges.data.slice(0, 3).map(({ id, challenges, challengeId }) => (
          <Link
            className="w-full line-clamp-1 h-5 break-words hover:shadow-md hover:font-bold"
            key={id}
            href={`/challenges/${challengeId}/detail`}
          >
            <li>{challenges?.title || '제목 없음'}</li>
          </Link>
        ))}
      </ul>
    </DashBoardJoinedChallengesLayout>
  );
};

export default DashBoardJoinedChallenges;
