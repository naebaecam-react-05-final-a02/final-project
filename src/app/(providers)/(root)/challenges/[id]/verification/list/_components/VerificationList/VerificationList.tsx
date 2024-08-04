'use client';

import { fetchDataByInfinityQuery } from '@/app/(providers)/(root)/challenges/[id]/verification/_hooks/useVerification';
import { createClient } from '@/supabase/client';
import { verificationsCountType, verificationsType } from '@/types/challenge';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useParams, usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import Masonry from 'react-masonry-css';
import LocalBanner from '../LocalBanner';
import VerificationCardSkeleton from '../VerificationCardSkeleton';
import VerificationItem from '../VerificationItem';

const VerificationList = ({ counts }: { counts: verificationsCountType }) => {
  const params = useParams();
  const path = usePathname();

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
      const nextPage = lastPage.length === 10 ? allPage.length : undefined;
      return nextPage;
    },
    initialPageParam: 1,
    select: (data) => data.pages.flatMap((p) => p),
    staleTime: Infinity,
  });

  console.log(verifications);

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
    <>
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
            </Masonry>
          </ul>
          {isFetching && hasNextPage && Array.from({ length: 5 }).map((_, i) => <VerificationCardSkeleton key={i} />)}
        </div>
      )}

      {!isFetching && hasNextPage && <div ref={obsRef} className="h-20 w-full" />}
    </>
  );
};

export default VerificationList;
