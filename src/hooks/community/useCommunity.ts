import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import { mutationOptions, queryOptions } from './queries';

// 커뮤니티 글 목록 조회 훅
export const useGetCommunityPosts = () => useInfiniteQuery(queryOptions.posts);

// 커뮤니티 글 상세 조회 훅
export const useGetCommunityPostDetail = (id: string) => useQuery(queryOptions.postDetail(id));

// 커뮤니티 글 등록 훅
export const useCreateCommunityPost = () => useMutation(mutationOptions.write);
