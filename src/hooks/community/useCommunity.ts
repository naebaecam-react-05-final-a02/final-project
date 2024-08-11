import { useMutation } from '@tanstack/react-query';
import { mutationOptions } from './queries';

// 커뮤니티 글 등록 훅
export const useCreateCommunityPost = () => useMutation(mutationOptions.write);
