'use client';

import { useGetUser } from '@/hooks/auth/useUsers';
import { useGetCommunityPosts } from '@/hooks/community/useCommunity';
import { CommunityPostData } from '@/types/community';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaRegCommentDots } from 'react-icons/fa6';
import { useInView } from 'react-intersection-observer';
import { searchCommunityPosts } from '../../../_utils/searchCommunityPosts';
import CommunityPostListItem from '../CommunityPostListItem';
import VotePostPreview from '../VotePostPreview';

interface DynamicCommunityPostsProps {
  selectedCategory: string;
  searchTerm: string;
  categories: string[];
}

const DynamicCommunityPosts = ({ selectedCategory, searchTerm, categories }: DynamicCommunityPostsProps) => {
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<CommunityPostData[]>([]);
  const { data: user } = useGetUser();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, error, fetchCategoryData } =
    useGetCommunityPosts({
      category: selectedCategory,
      categories,
    });

  const { ref: loadMoreRef, inView: loadMoreInView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (selectedCategory !== '전체') {
      fetchCategoryData();
    }
  }, [selectedCategory, fetchCategoryData]);

  useEffect(() => {
    if (loadMoreInView && hasNextPage && !isFetchingNextPage && !isSearching) {
      const currentItemCount = data?.pages.reduce((total, page) => total + page.data.length, 0) || 0;
      if (currentItemCount < data?.pages[0]?.totalCount!) {
        fetchNextPage();
      }
    }
  }, [loadMoreInView, fetchNextPage, hasNextPage, isFetchingNextPage, data, isSearching]);

  useEffect(() => {
    const performSearch = async () => {
      if (searchTerm) {
        setIsSearching(true);
        try {
          if (user) {
            const results = await searchCommunityPosts(searchTerm, '전체', user.id);
            if (results) {
              setSearchResults(results.data);
            }
          }
        } catch (error) {
          console.error('Search failed:', error);
        }
      } else {
        setIsSearching(false);
      }
    };

    performSearch();
  }, [searchTerm, user]);

  const posts = isSearching ? searchResults : data?.pages.flatMap((page) => page.data) ?? [];
  const latestVotePost = data?.pages[0]?.latestVotePost;

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">게시글을 불러오는데 실패했습니다.</div>;

  return (
    <div className="relative z-0 flex-grow overflow-y-auto">
      {!isSearching && (
        <div className="px-4 mb-4">{latestVotePost && <VotePostPreview latestVotePost={latestVotePost} />}</div>
      )}
      {isSearching && (
        <div className="px-4 py-2 mb-4">
          <h2 className="text-lg text-white font-semibold">{`'${searchTerm}'`} 검색 결과</h2>
        </div>
      )}
      {posts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
          <FaRegCommentDots className="text-6xl mb-4" />
          <p className="text-lg font-semibold text-white mb-2">
            {isSearching ? '검색 결과가 없습니다' : '아직 게시글이 없습니다'}
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4 px-4 mb-20">
          {posts.map((post: CommunityPostData) => (
            <Link href={`/community/${post.id}`} key={post.id}>
              <CommunityPostListItem post={post} />
            </Link>
          ))}
          {!isSearching && isFetchingNextPage ? (
            <div className="text-center text-whiteT-30 py-4">더 많은 게시글을 불러오는 중...</div>
          ) : !isSearching && hasNextPage ? (
            <div ref={loadMoreRef} className="h-10" />
          ) : null}
        </div>
      )}
    </div>
  );
};

export default DynamicCommunityPosts;
