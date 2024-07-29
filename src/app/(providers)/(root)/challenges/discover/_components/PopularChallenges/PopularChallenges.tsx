'use client';

import Link from 'next/link';
import Categories from '../Categories';
import ChallengeList from '../ChallengeList';

const PopularChallenges = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-3xl">인기있는 챌린지</h2>
        <Link href="/challenges/discover/popular">
          <div>전체보기</div>
        </Link>
      </div>
      <Categories />
      <ChallengeList />
    </div>
  );
};

export default PopularChallenges;
