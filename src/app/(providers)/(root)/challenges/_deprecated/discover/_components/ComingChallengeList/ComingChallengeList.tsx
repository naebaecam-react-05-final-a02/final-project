'use client';

import { useGetPopularChallenges } from '@/hooks/challenge/useChallenge';
import api from '@/service/service';
import { useChallengeCategoryStore } from '@/stores/stores';
import { Tables } from '@/types/supabase';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import ChallengeCard from '../../../_components/ChallengeCard';
import SkeletonCardList from '../../../_components/Skeleton/Card.skeleton';

type TChallenge = Tables<'challenges'>;

const ChallengeList = () => {
  const category = useChallengeCategoryStore((state) => state.category);

  const { data: test } = useQuery({
    queryKey: ['test'],
    queryFn: () => api.challenge.getPaginationChallenges({ category, page: 1, limit: 10 }),
  });

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
