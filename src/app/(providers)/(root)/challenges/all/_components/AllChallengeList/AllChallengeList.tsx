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
    <div className="w-full h-full">
      <ul className="h-full box-border grid grid-cols-2 gap-x-2 gap-y-6 overflow-scroll scroll">
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
        {isFetching && <SkeletonCardList length={6} />}
        {hasNextPage && (
          <>
            <div className="h-24"></div>
            <div ref={ref}></div>
            <div className="h-36"></div>
          </>
        )}
      </ul>
    </div>
  );
};

export default AllChallengeList;
