'use client';

import useIntersect from '@/hooks/useIntersect';
import api from '@/service/service';
import { useChallengeCategoryStore } from '@/stores/stores';
import { Tables } from '@/types/supabase';
import { useInfiniteQuery } from '@tanstack/react-query';
import Link from 'next/link';
import ChallengeCard from '../../../_components/ChallengeCard';
import SkeletonCardList from '../../../_components/Skeleton/Card.skeleton';

type TChallenge = Tables<'challenges'>;
const LIMIT = 6;

const AllChallengeList = () => {
  const category = useChallengeCategoryStore((state) => state.category);

  const {
    data: challenges,
    isPending,
    isFetching,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['challenges', 'popular', category],
    queryFn: ({ pageParam }) => api.challenge.getPaginationChallenges({ category, page: pageParam, limit: LIMIT }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  const ref = useIntersect(async (entry, observer) => {
    observer.unobserve(entry.target);
    if (hasNextPage && !isFetching) {
      fetchNextPage();
    }
  });

  return (
    <>
      <ul className="min-h-[480px] h-full grid grid-cols-2 gap-2 overflow-scroll">
        {!challenges || isPending ? (
          <SkeletonCardList length={6} />
        ) : (
          challenges.pages.map((page) =>
            page.data.map((challenge: TChallenge) => (
              <li key={challenge.id}>
                <Link href={`/challenges/detail/${challenge.id}`}>
                  <ChallengeCard challenge={challenge} />
                </Link>
              </li>
            )),
          )
        )}
        <div className="h-12"></div>
        <div ref={ref}></div>
        <div className="h-12"></div>
      </ul>
    </>
  );
};

export default AllChallengeList;
