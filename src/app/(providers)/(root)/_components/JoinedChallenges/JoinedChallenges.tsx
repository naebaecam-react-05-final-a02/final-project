'use client';

import api from '@/service/service';
import { createClient } from '@/supabase/client';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import React from 'react';

const JoinedChallengesLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Link href={'/challenges'}>
        <h5 className="text-white/50 text-sm hover:shadow-md hover:font-bold">챌린지</h5>
      </Link>
      {children}
    </>
  );
};

const JoinedChallenges = () => {
  const supabase = createClient();
  const { data: joinedChallenges, error } = useQuery({
    queryKey: ['joinedChallenge'],
    queryFn: () => api.dashboard.getJoinedChallenges(supabase),
  });

  if (!joinedChallenges) {
    return (
      <JoinedChallengesLayout>
        <div className="text-red-300 text-sm">
          <p className="text-base">챌린지 정보를 받아올 수 없습니다.</p>
        </div>
      </JoinedChallengesLayout>
    );
  }

  if (error) {
    return (
      <JoinedChallengesLayout>
        <div className="text-red-300 text-sm">
          <p className="text-base">{joinedChallenges.error}</p>
          {joinedChallenges.details && <p>상세 정보: {joinedChallenges.details}</p>}
        </div>
      </JoinedChallengesLayout>
    );
  }

  if (joinedChallenges.data === null || joinedChallenges.data.length === 0) {
    return (
      <JoinedChallengesLayout>
        <p className="text-white/50 text-xs">참여 중인 챌린지가 없습니다.</p>
      </JoinedChallengesLayout>
    );
  }

  return (
    <JoinedChallengesLayout>
      <ul className="w-full text-sm text-white grid grid-cols-1 sm:grid-cols-2 gap-y-5">
        {joinedChallenges.data.slice(0, 6).map(({ id, challenges, challengeId }) => {
          if (challenges?.isProgress === 'RUN') {
            return (
              <Link
                className="w-full line-clamp-1 h-5 break-words hover:font-bold"
                key={id}
                href={`/challenges/${challengeId}/detail`}
              >
                <li>{challenges?.title || '제목 없음'}</li>
              </Link>
            );
          }
        })}
      </ul>
    </JoinedChallengesLayout>
  );
};

export default JoinedChallenges;
