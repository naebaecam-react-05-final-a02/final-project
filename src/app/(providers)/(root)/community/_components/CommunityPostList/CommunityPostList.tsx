'use client';

import Loading from '@/components/Loading/Loading';
import NavBar from '@/components/NavBar';
import { useGetCommunityPosts } from '@/hooks/community/useCommunity';
import { CommunityPostData, PostsResponse } from '@/types/community';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaRegCommentDots } from 'react-icons/fa6';
import { useInView } from 'react-intersection-observer';
import CommunityListHeader from './CommunityListHeader';
import CommunityPostListItem from './CommunityPostListItem';
import FloatingWriteButton from './FloatingWriteButton';
import VotePostPreview from './VotePostPreview';

const categories = [{ value: '전체' }, { value: '자유 게시판' }, { value: 'Q&A 게시판' }, { value: '정보공유' }];
interface CommunityPostListProps {
  initialData: PostsResponse | undefined;
}
const CommunityPostList = ({ initialData }: CommunityPostListProps) => {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, error, fetchCategoryData } =
    useGetCommunityPosts({
      category: selectedCategory,
      categories: categories.map((c) => c.value),
      initialData,
    });

  const { ref: loadMoreRef, inView: loadMoreInView } = useInView({
    threshold: 0,
  });

  const { ref: buttonVisibilityRef, inView: buttonVisibilityInView } = useInView({
    threshold: 0,
    rootMargin: '0px 0px 200px 0px',
  });

  useEffect(() => {
    fetchCategoryData();
  }, [fetchCategoryData]);

  useEffect(() => {
    if (loadMoreInView && hasNextPage && !isFetchingNextPage) {
      const currentItemCount = data?.pages.reduce((total, page) => total + page.data.length, 0) || 0;
      if (currentItemCount < data?.pages[0]?.totalCount!) {
        fetchNextPage();
      }
    }
  }, [loadMoreInView, fetchNextPage, hasNextPage, isFetchingNextPage, data]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const posts = data?.pages.flatMap((page) => page.data) ?? [];
  const latestVotePost = data?.pages[0]?.latestVotePost;

  if (isLoading) return <Loading />;
  if (error) return <div className="text-center py-10 text-red-500">게시글을 불러오는데 실패했습니다.</div>;
  console.log(1);
  return (
    <div className="relative min-h-screen overflow-hidden max-w-[800px] flex flex-col mx-auto">
      <CommunityListHeader categories={categories} onCategoryChange={handleCategoryChange} />
      <div className="px-4 mb-4">{latestVotePost && <VotePostPreview latestVotePost={latestVotePost} />}</div>
      <div className="relative z-0 flex-grow overflow-y-auto ">
        {posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <FaRegCommentDots className="text-6xl mb-4" />
            <p className="text-lg font-semibold mb-2">아직 게시글이 없습니다</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4 px-4 mb-20">
            {posts.map((post: CommunityPostData) => (
              <Link href={`/community/${post.id}`} key={post.id}>
                <CommunityPostListItem post={post} />
              </Link>
            ))}
            {isFetchingNextPage ? (
              <div className="text-center text-whiteT-30 py-4">더 많은 게시글을 불러오는 중...</div>
            ) : hasNextPage ? (
              <div ref={loadMoreRef} className="h-10" />
            ) : null}
          </div>
        )}
        <div className="fixed bottom-0 left-0 right-0 pointer-events-none">
          <div className="max-w-[800px] mx-auto px-4 relative">
            <div className="absolute bottom-20 right-4 md:right-10 pointer-events-auto">
              <Link href="/community/write">
                <FloatingWriteButton inView={buttonVisibilityInView} />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div ref={buttonVisibilityRef} className="h-0 relative -z-10" />
      <NavBar className="fixed bottom-0 max-w-[800px] " />
    </div>
  );
};

export default CommunityPostList;
