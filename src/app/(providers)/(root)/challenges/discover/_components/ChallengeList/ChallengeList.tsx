'use client';

import { useGetPopularChallenges } from '@/hooks/challenge/useChallenge';
import { useChallengeCategoryStore } from '@/stores/stores';
import { Tables } from '@/types/supabase';
import Link from 'next/link';
import ChallengeCard from '../ChallengeCard';
import SkeletonCardList from '../Skeleton/Card.skeleton';

type TChallenge = Tables<'challenges'>;

const ChallengeList = () => {
  const category = useChallengeCategoryStore((state) => state.category);

  const { data: challenges, isPending } = useGetPopularChallenges({ category });

  return (
    <ul className="min-h-[480px] grid grid-cols-2 gap-2">
      {isPending ? (
        <SkeletonCardList length={4} />
      ) : (
        challenges.data.map((challenge: TChallenge) => (
          <li key={challenge.id}>
            <Link href={`/challenges/detail/${challenge.id}`}>
              <ChallengeCard challenge={challenge} />
            </Link>
          </li>
        ))
      )}
    </ul>
  );
};

export default ChallengeList;
