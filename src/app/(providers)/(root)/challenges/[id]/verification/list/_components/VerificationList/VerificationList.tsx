'use client';

import { fetchDataByInfinityQuery } from '@/app/(providers)/(root)/challenges/[id]/verification/_hooks/useVerification';
import { createClient } from '@/supabase/client';
import { verificationsCountType, verificationsType } from '@/types/challenge';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useEffect, useRef } from 'react';
import Masonry from 'react-masonry-css';
import LocalBanner from '../LocalBanner';
import VerificationCardSkeleton from '../VerificationCardSkeleton';
import VerificationItem from '../VerificationItem';

const VerificationList = ({ counts }: { counts: verificationsCountType }) => {
  const params = useParams();

  const obsRef = useRef<HTMLDivElement>(null);
  const supabase = createClient();

  const {
    data: verifications,
    isFetching,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ['verifications', { cid: params.id }],
    queryFn: ({ pageParam }) => fetchDataByInfinityQuery(supabase, params.id as string, pageParam),
    getNextPageParam: (lastPage: verificationsType[], allPage: verificationsType[][]) => {
      // console.log('LASTPAGE', lastPage);
      // console.log('ALLPAGE', allPage);
      const nextPage = lastPage.length === 6 ? allPage.length : undefined;
      return nextPage;
    },
    initialPageParam: 1,
    select: (data) => data.pages.flatMap((p) => p),
    staleTime: Infinity,
  });

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries, observer) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
          observer.unobserve(entries[0].target);
        }
      },
      { threshold: 0.9 },
    );

    const currentRef = obsRef.current;

    if (currentRef) obs.observe(currentRef);

    return () => {
      if (currentRef) obs.unobserve(currentRef);
    };
  }, [verifications, fetchNextPage, hasNextPage]);

  return (
    <div className="px-4">
      {!verifications ||
        (!verifications.length && (
          <div>
            <LocalBanner users={0} />
          </div>
        ))}
      {verifications && verifications.length > 0 && (
        <div className="flex flex-col gap-4 px-4">
          <LocalBanner users={counts.totalUsers} />

          <ul>
            <Masonry breakpointCols={2} className="my-masonry-grid" columnClassName="my-masonry-grid_column">
              {verifications?.map((verification, i) => (
                <li className="list-none" key={verification.id}>
                  <VerificationItem verification={verification} />
                </li>
              ))}
              {isFetching &&
                hasNextPage &&
                Array.from({ length: 5 }).map((_, i) => (
                  <li key={i}>
                    <VerificationCardSkeleton />
                  </li>
                ))}
            </Masonry>
          </ul>
        </div>
      )}

      {!isFetching && hasNextPage && <div ref={obsRef} className="h-20 w-full" />}
    </div>
  );
};

export default VerificationList;
