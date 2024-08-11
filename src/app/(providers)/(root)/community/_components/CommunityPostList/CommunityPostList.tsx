'use client';

import Loading from '@/components/Loading/Loading';
import { useGetCommunityPosts } from '@/hooks/community/useCommunity';
import Mobile from '@/layouts/Mobile';
import { CommunityPostData } from '@/types/community';
import Link from 'next/link';
import { useEffect } from 'react';
import { FaRegCommentDots } from 'react-icons/fa6';
import { useInView } from 'react-intersection-observer';
import CommunityPostListItem from './CommunityPostListItem';

const CommunityPostList = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, error } = useGetCommunityPosts();
  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  if (isLoading) return <Loading />;
  if (error) return <div className="text-center py-10 text-red-500">게시글을 불러오는데 실패했습니다.</div>;

  const posts = data?.pages.flatMap((page) => page.data) ?? [];

  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-400">
        <FaRegCommentDots className="text-6xl mb-4" />
        <p className="text-lg font-semibold mb-2">아직 게시글이 없습니다</p>
      </div>
    );
  }

  return (
    <Mobile>
      <div className="flex flex-col px-4 gap-4">
        {posts.map((post: CommunityPostData) => (
          <Link href={`/community/${post.id}`} key={post.id}>
            <CommunityPostListItem post={post} />
          </Link>
        ))}
        {isFetchingNextPage ? (
          <div className="text-center py-4">더 많은 게시글을 불러오는 중...</div>
        ) : hasNextPage ? (
          <div ref={ref} className="h-10" />
        ) : null}
      </div>
    </Mobile>
  );
};

export default CommunityPostList;
