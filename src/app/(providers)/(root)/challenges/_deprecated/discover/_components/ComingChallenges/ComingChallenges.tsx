'use client';

import Link from 'next/link';

import Categories from '../Categories';
import ComingChallengeList from '../ComingChallengeList';

const ComingChallenges = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-3xl">곧 시작하는 챌린지</h2>
        <Link href="/challenges/all">
          <div>전체보기</div>
        </Link>
      </div>
      <Categories />
      <ComingChallengeList />
    </div>
  );
};

export default ComingChallenges;
