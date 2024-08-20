'use client';

import ChallengeItem from '@/app/(providers)/(root)/challenges/_components/ChallengeItem';
import SkeletonCardList from '@/app/(providers)/(root)/challenges/_components/Skeleton/Card.skeleton';
import useIntersect from '@/hooks/useIntersect';
import api from '@/service/service';

import { Tables } from '@/types/supabase';
import { useInfiniteQuery } from '@tanstack/react-query';
import Link from 'next/link';

const MyChallengeList = () => {
  type TChallenge = Tables<'challengeParticipants'> & { challenges: Tables<'challenges'> & { user: Tables<'users'> } };
  const LIMIT = 6;

  const {
    data: challenges,
    isPending,
    isFetching,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['challenges', 'me', 'run'],
    queryFn: ({ pageParam }) => api.challenge.getPaginatedMyChallenges({ page: pageParam, limit: LIMIT }),
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
      <div className="w-full h-full">
        <ul className="flex flex-col gap-2 overflow-scroll scroll">
          {!challenges?.pages || isPending ? (
            <SkeletonCardList length={1} />
          ) : challenges?.pages[0]?.error ? (
            <p className="w-full flex justify-center py-4 text-white/70">해당 챌린지가 없습니다.</p>
          ) : (
            challenges.pages.map((page) =>
              page.data.map((participant: TChallenge) => (
                <li key={participant.challenges.id}>
                  <Link href={`/challenges/${participant.challenges.id}/detail`}>
                    <ChallengeItem challenge={participant.challenges} />
                  </Link>
                </li>
              )),
            )
          )}
          {hasNextPage && (
            <>
              <div className="h-12"></div>
              <div ref={ref}></div>
              <div className="h-18"></div>
            </>
          )}
        </ul>
      </div>
    </>
  );
};

export default MyChallengeList;
