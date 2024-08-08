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

  return (
    <>
      <p className="text-white/50 text-[12px]">총 {999}개의 챌린지가 있습니다.</p>
      <div className="w-full h-full">
        <ul className="flex flex-col gap-2 overflow-scroll scroll">
          {!challenges?.pages || isPending ? (
            <SkeletonCardList length={1} />
          ) : challenges?.pages[0]?.error ? (
            <p className="w-full flex justify-center py-4 text-white/70">해당 챌린지가 없습니다.</p>
          ) : (
            challenges.pages.map((page) =>
              page.data.map((challenge: TChallenge) => (
                <li key={challenge.id}>
                  <Link href={`/challenges/${challenge.id}/detail`}>
                    <ChallengeItem challenge={challenge} />
                  </Link>
                </li>
              )),
            )
          )}

          {hasNextPage && (
            <>
              <div className="h-24"></div>
              <div ref={ref}></div>
              <div className="h-36"></div>
            </>
          )}
        </ul>
      </div>
    </>
  );
};

export default ChallengeList;
