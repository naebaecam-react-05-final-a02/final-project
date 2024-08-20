'use client';

import MyPageHeader from '@/components/Header/MyPageHeader';
import Loading from '@/components/Loading/Loading';
import useIntersect from '@/hooks/useIntersect';
import Mobile from '@/layouts/Mobile';
import api from '@/service/service';
import { useInfiniteQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { FaRegCommentDots } from 'react-icons/fa6';
import MyActivityListItem from '../../_components/MyActivityList/MyActivityListItem';
import { MyAnswerTypes } from '../../_types/types';

const LIMIT = 6;
const MyAnswersPage = () => {
  const {
    data: MyAnswers,
    isPending,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['mypage', 'activities', 'myAnswers'],
    queryFn: ({ pageParam }) => api.users.getPaginatedMyAnswers({ page: pageParam, limit: LIMIT }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  const ref = useIntersect(async (entry, observer) => {
    observer.unobserve(entry.target);
    if (hasNextPage && !isFetching) {
      fetchNextPage();
    }
  });

  if (isPending) return <Loading />;
  return (
    <Mobile headerLayout={<MyPageHeader />}>
      {MyAnswers?.pages.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
          <FaRegCommentDots className="text-6xl mb-4" />
          <p className="text-lg font-semibold mb-2">아직 게시글이 없습니다</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4 px-4">
          {MyAnswers?.pages.map((page) =>
            page.data.map((post: MyAnswerTypes) => (
              <Link href={`/community/${post.questionId}`} key={post.questionId}>
                <MyActivityListItem post={post.post} />
              </Link>
            )),
          )}
          {isFetchingNextPage ? (
            <div className="text-center py-4">더 많은 게시글을 불러오는 중...</div>
          ) : hasNextPage ? (
            <>
              <div className="h-12"></div>
              <div ref={ref}></div>
              <div className="h-18"></div>
            </>
          ) : null}
        </div>
      )}
    </Mobile>
  );
};

export default MyAnswersPage;
