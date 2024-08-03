'use client';

import useIntersect from '@/hooks/useIntersect';
import api from '@/service/service';
import { useChallengeCategoryStore } from '@/stores/stores';
import { Tables } from '@/types/supabase';
import { useInfiniteQuery } from '@tanstack/react-query';
import Link from 'next/link';
import ChallengeItem from '../ChallengeItem';
import SkeletonCardList from '../Skeleton/Card.skeleton';

const ChallengeList = () => {
  const category = useChallengeCategoryStore((state) => state.category);

  type TChallenge = Tables<'challenges'>;
  const LIMIT = 6;

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
  console.log(challenges?.pages);
  return (
    <div className="w-full h-full">
      <ul className="flex flex-col gap-2 overflow-scroll scroll">
        {!challenges?.pages || isPending ? (
          <SkeletonCardList length={6} />
        ) : challenges?.pages[0]?.error ? (
          <p>데이터가 없습니다</p>
        ) : (
          challenges.pages.map((page) =>
            page.data.map((challenge: TChallenge) => (
              <li key={challenge.id}>
                <Link href={`/challenges/detail/${challenge.id}`}>
                  <ChallengeItem challenge={challenge} />
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

export default ChallengeList;
