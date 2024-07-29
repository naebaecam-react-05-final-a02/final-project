'use client';

import { useChallengeCategoryStore } from '@/stores/stores';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import ChallengeCard from '../ChallengeCard';

const ChallengeList = () => {
  const category = useChallengeCategoryStore((state) => state.category);
  const { data: challenges, isPending } = useQuery({
    queryKey: ['challenges', category],
    queryFn: () => fetch(`/api/challenge/popular?category=${category}`).then((res) => res.json()),
  });
  console.log(challenges);
  if (isPending) return <div>Loading</div>;
  return (
    <ul className="grid grid-cols-2 gap-2">
      {isPending ? (
        <p>Loading...</p>
      ) : (
        challenges.data.map((challenge: any) => (
          <li key={challenge.id}>
            <Link href={`/challenge/detail/${challenge.id}`}>
              <ChallengeCard challenge={challenge} />
            </Link>
          </li>
        ))
      )}
    </ul>
  );
};

export default ChallengeList;
