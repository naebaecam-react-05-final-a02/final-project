import { UserData } from '@/app/(providers)/(root)/mypage/_types/types';

export interface CommunityPostData {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  createdAt: string;
  views: number;
  likes: number;
  dislikes: number;
  score: number;
  commentCount?: number;
  responseCount?: number;
  isLiked: boolean | null;
  user: UserData;
}

export interface CommunityVotePostData {
  id: string;
  title: string;
  category: string;
  tags: string[];
  createdAt: string;
  views: number;
  likes: number;
  commentCount: number;
  isLiked: boolean;
  user?: UserData;
}

export interface CommunityPostCreateData {
  title: string;
  content: string;
  category: string;
  tags: string[];
}

export interface CommunityPostUpdateData {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
}

export interface CommentData {
  id: string;
  postId: string;
  userId: string;
  content: string;
  createdAt: string;
  likes: number;
  isLiked: boolean;
  user: UserData;
}

export interface ReplyData {
  id: string;
  commentId: string;
  userId: string;
  content: string;
  createdAt: string;
  likes: number;
  isLiked: boolean;
  user: UserData;
}

export interface CommentCreateData {
  postId: string;
  content: string;
}

export interface ReplyCreateData {
  postId: string;
  commentId: string;
  content: string;
}

export interface CommentUpdateData {
  id: string;
  content: string;
}

export interface ReplyUpdateData {
  id: string;
  commentId: string;
  content: string;
}

export interface VoteItem {
  text: string;
  votes: number;
}
export interface VoteUpdateData {
  postId: string;
  items: VoteItem[];
  selectedOption: string;
}
export interface VoteData {
  title: string;
  items: VoteItem[];
}

export interface Answer {
  id: string;
  questionId: string;
  content: string;
  createdAt: string;
  user: UserData;
  userId: string;
  likes: number;
  dislikes: number;
  score: number;
  isLiked: boolean | null;
}

export interface PostsResponse {
  data: CommunityPostData[];
  page: number;
  limit: number;
  latestVotePost?: CommunityVotePostData;
  totalCount: number;
}

export interface UseGetCommunityPostsProps {
  category: string;
  categories: string[];
}

export interface AnswerResponse {
  answers: Answer[];
  acceptedAnswer: Answer | null;
  hasUserAnswered: boolean;
}

export interface Answer {
  id: string;
  questionId: string;
  content: string;
  createdAt: string;
  user: UserData;
  userId: string;
  likes: number;
  dislikes: number;
  score: number;
  isLiked: boolean | null;
}

export interface LikeResponse {
  likes: number;
  dislikes: number;
  score: number;
  likeType: 'like' | 'dislike' | null;
}
